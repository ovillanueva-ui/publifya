-- OPTIONAL dev/demo fixture — NOT part of the real seed path (supabase/seed.sql).
-- The 4 original demo clients (Café Luna, Moda Urbana, Estudio Verde, Northstar Fit) were
-- always a frontend mockup, never a real account — the production app should only contain
-- the real client (nutriologa). Kept here only in case local development wants some extra
-- sample data to click through. Run manually if/when needed; do not run against production.

-- ============================================================================
-- Clientes demo
-- ============================================================================

insert into clientes (id, nombre, sector, color, iniciales) values
  ('cafe-luna',      'Café Luna',       'Cafetería de especialidad',    '#2F6F5E', 'CL'),
  ('moda-urbana',    'Moda Urbana',     'Streetwear',                   '#B5533C', 'MU'),
  ('estudio-verde',  'Estudio Verde',   'Arquitectura sostenible',      '#5B7B4F', 'EV'),
  ('northstar-fit',  'Northstar Fit',   'Estudio de entrenamiento',     '#A0802E', 'NF');

-- ============================================================================
-- Contenido demo (4 clientes, 16 piezas — igual al antiguo mock-content.ts)
-- ============================================================================

insert into contenidos (id, cliente_id, titulo, descripcion, estado, formato, redes, propietario, fecha_publicacion) values
  ('c0000000-0000-0000-0000-000000000001', 'cafe-luna',     'Receta de temporada: latte de maple',           'Un paso a paso rápido para preparar nuestro latte de temporada en casa.',       'Publicado',    'Reel',         '{instagram}', 'Valentina Ríos', '2026-10-27'),
  ('c0000000-0000-0000-0000-000000000002', 'cafe-luna',     'Nuevos horarios de fin de semana',               'Anuncio del nuevo horario extendido los sábados y domingos.',                   'Programado',   'Publicación',  '{facebook}',  'Mateo Gómez',    '2026-11-02'),
  ('c0000000-0000-0000-0000-000000000003', 'cafe-luna',     'Detrás del grano: nuestro proceso de tueste',    'Artículo largo sobre el origen y tueste de nuestros granos.',                   'En revisión',  'Artículo',     '{blog}',      'Camila Torres',  null),
  ('c0000000-0000-0000-0000-000000000004', 'cafe-luna',     'Prepara tu café en casa',                        'Historia con tips rápidos de preparación para la audiencia.',                   'Borrador',     'Historia',     '{instagram}', 'Valentina Ríos', null),

  ('c0000000-0000-0000-0000-000000000005', 'moda-urbana',   'Lookbook otoño: capas urbanas',                  'Carrusel con combinaciones de la colección de otoño.',                          'Publicado',    'Carrusel',     '{instagram}', 'Diego Fernández','2026-10-25'),
  ('c0000000-0000-0000-0000-000000000006', 'moda-urbana',   'Restock: la jacket más pedida',                  'Video corto anunciando la vuelta de stock de la chaqueta estrella.',            'Programado',   'Video',        '{tiktok}',    'Mateo Gómez',    '2026-11-04'),
  ('c0000000-0000-0000-0000-000000000007', 'moda-urbana',   'Guía de tallas actualizada',                      'Página con la nueva guía de tallas para todas las categorías.',                 'En revisión',  'Artículo',     '{web}',       'Camila Torres',  null),
  ('c0000000-0000-0000-0000-000000000008', 'moda-urbana',   'Detrás de cámaras: sesión de fotos',             'Publicación mostrando el backstage de la última campaña.',                      'Borrador',     'Publicación',  '{x}',         'Diego Fernández',null),

  ('c0000000-0000-0000-0000-000000000009', 'estudio-verde', 'Caso de estudio: Casa Pampa',                    'Artículo técnico sobre los materiales y el diseño bioclimático del proyecto.',  'Publicado',    'Artículo',     '{linkedin}',  'Camila Torres',  '2026-10-22'),
  ('c0000000-0000-0000-0000-000000000010', 'estudio-verde', 'Newsletter de octubre: materiales sostenibles',  'Resumen mensual con los materiales sostenibles que estamos explorando.',        'Programado',   'Newsletter',   '{email}',     'Valentina Ríos', '2026-11-01'),
  ('c0000000-0000-0000-0000-000000000011', 'estudio-verde', 'Del boceto a la obra',                           'Reel mostrando la evolución de un proyecto desde el primer boceto.',            'En revisión',  'Reel',         '{instagram}', 'Diego Fernández',null),
  ('c0000000-0000-0000-0000-000000000012', 'estudio-verde', 'Huella de carbono por proyecto',                 'Infografía comparando la huella de carbono de tres proyectos recientes.',       'Borrador',     'Infografía',   '{linkedin}',  'Mateo Gómez',    null),

  ('c0000000-0000-0000-0000-000000000013', 'northstar-fit', 'Reto de 21 días: últimos cupos',                 'Historia recordando los últimos cupos disponibles para el reto.',               'Programado',   'Historia',     '{instagram}', 'Mateo Gómez',    '2026-10-31'),
  ('c0000000-0000-0000-0000-000000000014', 'northstar-fit', 'Testimonio: transformación de Marco',            'Video largo con el testimonio completo de un alumno del estudio.',              'Publicado',    'Video',        '{youtube}',   'Diego Fernández','2026-10-19'),
  ('c0000000-0000-0000-0000-000000000015', 'northstar-fit', 'Rutina express de 15 minutos',                   'Video corto con una rutina completa para hacer en casa.',                       'En revisión',  'Video',        '{tiktok}',    'Valentina Ríos', null),
  ('c0000000-0000-0000-0000-000000000016', 'northstar-fit', 'Actualización del horario de clases',            'Publicación informando los nuevos horarios de clases grupales.',                'Borrador',     'Publicación',  '{facebook}',  'Camila Torres',  null);

select set_contenido_tags('c0000000-0000-0000-0000-000000000001', array['Temporada', 'Receta']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000002', array['Anuncio']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000003', array['Origen', 'Proceso']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000004', array['Tips']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000005', array['Lookbook', 'Otoño']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000006', array['Restock']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000007', array['Soporte']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000008', array['Backstage']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000009', array['Caso de estudio']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000010', array['Newsletter']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000011', array['Proceso']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000012', array['Sostenibilidad']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000013', array['Reto']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000014', array['Testimonio']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000015', array['Rutina']);
select set_contenido_tags('c0000000-0000-0000-0000-000000000016', array['Horarios']);
