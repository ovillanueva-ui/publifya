-- Publifya MVP schema.
-- Builds on supabase/schema-proposal.md, adjusted to: no auth (no `profiles`/`client_users`,
-- RLS stays enabled but permissive for the anon key), `redes` as an array instead of a single
-- `red`, tags normalized into their own table (uppercase-enforced), and the extra fields needed
-- to represent a real editorial content grid (tipo_editorial, peso, enfoque, copy_completo,
-- hashtags, cta).
--
-- Run this once in the Supabase SQL editor (or via `supabase db push`), then supabase/seed.sql.

create extension if not exists pgcrypto;
create extension if not exists moddatetime schema extensions;

-- ---------------------------------------------------------------------------
-- Enums — same literal values as the TypeScript union types (incl. accents),
-- so no enum<->label mapping layer is needed anywhere in the app.
-- ---------------------------------------------------------------------------

create type estado_contenido as enum ('Borrador', 'En revisión', 'Programado', 'Publicado');

create type formato_contenido as enum (
  'Publicación', 'Historia', 'Reel', 'Carrusel', 'Video', 'Artículo', 'Newsletter', 'Infografía'
);

create type tipo_editorial as enum ('Educativo', 'Informativo', 'Entretenimiento', 'Comunidad', 'Promocional');

create type red_social as enum (
  'instagram', 'facebook', 'tiktok', 'x', 'linkedin', 'youtube', 'blog', 'email', 'web'
);

create type peso_contenido as enum ('valor', 'servicio');

-- ---------------------------------------------------------------------------
-- clientes — las cuentas que administra la agencia.
-- `id` es el slug actual ("cafe-luna", etc.), no un uuid: cero cambios en las URLs de
-- /portal/[clienteId] ni en los sitios del frontend que ya tratan Cliente.id como string.
-- ---------------------------------------------------------------------------

create table clientes (
  id text primary key,
  nombre text not null,
  sector text not null default '',
  color text not null,
  iniciales text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- contenidos — el contenido editorial.
-- ---------------------------------------------------------------------------

create table contenidos (
  id uuid primary key default gen_random_uuid(),
  cliente_id text not null references clientes (id) on delete cascade,
  titulo text not null,
  descripcion text not null default '',
  estado estado_contenido not null default 'Borrador',
  formato formato_contenido,                -- antes "tipo"; nullable por compatibilidad con datos demo
  tipo_editorial tipo_editorial,            -- nuevo: Educativo/Informativo/Entretenimiento/Comunidad/Promocional
  redes red_social[] not null default '{}',
  peso peso_contenido,                      -- nuevo: valor/servicio (regla 65/35)
  enfoque text,                             -- nuevo: área clínica/temática
  copy_completo text,                       -- nuevo: cuerpo real del copy (distinto de `descripcion`, que es el resumen corto)
  hashtags text[],                          -- nuevo: hashtags del post, texto libre (no es el mismo concepto que `etiquetas`)
  cta text,                                 -- nuevo
  propietario text not null default '',
  fecha_publicacion date,
  comentario_cliente text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on contenidos (cliente_id);
create index on contenidos (estado);

create trigger set_updated_at
  before update on contenidos
  for each row execute function extensions.moddatetime(updated_at);

-- ---------------------------------------------------------------------------
-- Etiquetas normalizadas (siempre en MAYÚSCULAS, sin importar cómo las capture el usuario).
-- ---------------------------------------------------------------------------

create table tags (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  constraint tags_nombre_mayusculas check (nombre = upper(nombre)),
  constraint tags_nombre_unique unique (nombre)
);

create table contenido_tags (
  contenido_id uuid not null references contenidos (id) on delete cascade,
  tag_id uuid not null references tags (id) on delete cascade,
  primary key (contenido_id, tag_id)
);

create index on contenido_tags (tag_id);

-- Normaliza a mayúsculas y hace upsert; así la app nunca tiene que acordarse de poner mayúsculas.
create or replace function get_or_create_tag(p_nombre text)
returns uuid language plpgsql as $$
declare
  v_id uuid;
  v_upper text := upper(trim(p_nombre));
begin
  select id into v_id from tags where nombre = v_upper;
  if v_id is null then
    insert into tags (nombre) values (v_upper)
      on conflict (nombre) do update set nombre = excluded.nombre
      returning id into v_id;
  end if;
  return v_id;
end;
$$;

-- Reemplaza el set completo de etiquetas de una pieza en una sola llamada.
create or replace function set_contenido_tags(p_contenido_id uuid, p_nombres text[])
returns void language plpgsql as $$
declare
  v_nombre text;
begin
  delete from contenido_tags where contenido_id = p_contenido_id;
  foreach v_nombre in array coalesce(p_nombres, '{}') loop
    if trim(v_nombre) = '' then
      continue;
    end if;
    insert into contenido_tags (contenido_id, tag_id)
      values (p_contenido_id, get_or_create_tag(v_nombre))
      on conflict do nothing;
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- Vista de lectura: contenidos + etiquetas pre-agregadas como array.
-- ---------------------------------------------------------------------------

create or replace view v_contenidos as
  select c.*,
         coalesce(array_agg(t.nombre) filter (where t.nombre is not null), '{}') as etiquetas
    from contenidos c
    left join contenido_tags ct on ct.contenido_id = c.id
    left join tags t on t.id = ct.tag_id
   group by c.id;

-- ---------------------------------------------------------------------------
-- contenido_actividad — historial (sin autor_id: no hay `profiles` en este MVP).
-- ---------------------------------------------------------------------------

create table contenido_actividad (
  id uuid primary key default gen_random_uuid(),
  contenido_id uuid not null references contenidos (id) on delete cascade,
  tipo text not null check (tipo in ('creado', 'actualizado', 'aprobado', 'cambios_solicitados', 'eliminado')),
  detalle text,
  created_at timestamptz not null default now()
);

create index on contenido_actividad (contenido_id, created_at desc);

-- ---------------------------------------------------------------------------
-- RPCs para las mutaciones del portal del cliente.
-- Sin auth.uid()/client_users (no hay login en este MVP): siguen validando la transición de
-- estado y registrando actividad, pero son convención de la app, no seguridad por identidad —
-- mismo nivel de confianza que tiene hoy la app sin ningún login.
-- ---------------------------------------------------------------------------

create or replace function approve_content(p_contenido_id uuid)
returns setof contenidos language plpgsql security definer as $$
begin
  insert into contenido_actividad (contenido_id, tipo) values (p_contenido_id, 'aprobado');
  return query
    update contenidos
       set estado = 'Programado', comentario_cliente = null
     where id = p_contenido_id and estado = 'En revisión'
    returning *;
end;
$$;

create or replace function request_content_changes(p_contenido_id uuid, p_comentario text)
returns setof contenidos language plpgsql security definer as $$
begin
  insert into contenido_actividad (contenido_id, tipo, detalle) values (p_contenido_id, 'cambios_solicitados', p_comentario);
  return query
    update contenidos
       set estado = 'Borrador', comentario_cliente = p_comentario
     where id = p_contenido_id and estado = 'En revisión'
    returning *;
end;
$$;

-- ---------------------------------------------------------------------------
-- RLS — habilitado en todas las tablas, políticas permisivas para la anon key.
-- No hay identidad que validar en este MVP (sin login): esto evita que el dashboard de
-- Supabase marque tablas abiertas por accidente, no es seguridad real.
-- ---------------------------------------------------------------------------

alter table clientes enable row level security;
alter table contenidos enable row level security;
alter table contenido_actividad enable row level security;
alter table tags enable row level security;
alter table contenido_tags enable row level security;

create policy "anon lee clientes" on clientes for select using (true);

create policy "anon gestiona contenidos" on contenidos for all using (true) with check (true);

create policy "anon lee actividad" on contenido_actividad for select using (true);
create policy "anon inserta actividad" on contenido_actividad for insert with check (true);

create policy "anon gestiona tags" on tags for all using (true) with check (true);
create policy "anon gestiona contenido_tags" on contenido_tags for all using (true) with check (true);

grant execute on function get_or_create_tag(text) to anon;
grant execute on function set_contenido_tags(uuid, text[]) to anon;
grant execute on function approve_content(uuid) to anon;
grant execute on function request_content_changes(uuid, text) to anon;
