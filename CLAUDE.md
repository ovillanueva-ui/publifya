# CLAUDE.md

Este archivo da contexto a Claude Code (claude.ai/code) para trabajar en este repositorio.

## Qué es esto

Publifya: un CMS para una agencia que administra contenido social de múltiples clientes finales. Respaldado por Supabase (Postgres) — ver "Capa de datos" abajo. `supabase/schema-proposal.md` es el documento de diseño histórico original (se conserva como contexto); el esquema realmente implementado es `supabase/migrations/0001_init.sql` + `supabase/seed.sql`. Sin autenticación todavía: tanto el panel admin como el portal de clientes son de acceso abierto, mismo modelo de confianza que la versión anterior con datos mock — las mutaciones del portal (aprobar/pedir cambios) pasan por funciones RPC de Postgres en vez de un `UPDATE` directo, para mantener la regla de negocio aunque no haya login.

## Pendientes

- **Verificar front Publifya vs publifyacopia** (agregado 2026-11-04): existe una copia del proyecto en `C:\Users\ra-cs\proyectos\publifyacopia` con mejor front y diseño. Falta comparar y decidir qué llevarse de ahí a este repo. **Nota: solo front/diseño** — no portar su lógica de datos/backend, este repo ya tiene su propio esquema de Supabase funcionando.

## Comandos

```bash
npm run dev      # servidor de desarrollo (Turbopack). Toma el siguiente puerto libre si el 3000 está ocupado — lee la línea "Local:", no asumas 3000.
npm run build    # build de producción; también corre el chequeo de TypeScript y prerrenderiza los params estáticos
npm run lint     # eslint (flat config, eslint-config-next)
npx tsc --noEmit # solo chequeo de tipos, más rápido que un build completo
```

Requiere `.env.local` con `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API en Supabase) — `npm run build`/`npm run dev` truenan al cargar el módulo si faltan (`src/lib/supabase/client.ts`). En Vercel, estas deben configurarse en Project Settings → Environment Variables; `.env.local` está en `.gitignore` y nunca llega solo a un deploy.

No hay configuración de tests en este repo (sin Jest/Vitest, sin archivos de test).

`legacy-static-prototype/` está excluido del lint (ver los ignores de `eslint.config.mjs`) — es un mockup en HTML/CSS/JS plano que se conserva solo como referencia visual, no es parte de la app de Next.js.

## Arquitectura

**Dos árboles de rutas separados bajo una sola app de Next.js:**
- `/` — el panel admin interno que usa el equipo de la agencia (sidebar + topbar + módulos de biblioteca de contenido/resumen/clientes). Todo pasa por `src/components/app-shell.tsx`.
- `/portal` y `/portal/[clienteId]` — una experiencia separada y reducida para los *clientes finales* de la agencia. Sin sidebar, sin visibilidad entre clientes. Los clientes ahora viven en Supabase, no en un array estático, así que no hay `generateStaticParams` — ambas rutas del portal son Server Components async que traen datos de Supabase por request. Bajo `cacheComponents` (ver el gotcha de Next.js más abajo) ese fetch no puede ir directo en el cuerpo de la página, así que cada ruta es un wrapper delgado (`page.tsx`, sin `await`) alrededor de un Server Component interno async envuelto en `<Suspense>` (`portal-picker-content.tsx` / `[clienteId]/portal-client-content.tsx`) — es el patrón de Partial Prerendering que pide `partialPrefetching: true` en `next.config.ts`.

Ambos árboles leen/escriben los **mismos** stores de Zustand, que ahora son envolturas delgadas sobre Supabase (fetch al montar, mutación vía `supabase-js`) en vez de arrays planos en memoria — por ejemplo, aprobar contenido en `/portal` llama la RPC `approve_content`, que el panel de detalles del admin recoge en su propio siguiente fetch. Sin autenticación: esto es convención a nivel app (RPC en vez de `UPDATE` directo), no seguridad por identidad.

**Un solo límite `"use client"`.** `src/components/app-shell.tsx` es el único punto de entrada de client boundary para el árbol admin; todo lo que importa es transitivamente parte del bundle de cliente, así que los componentes hoja no necesitan su propio `"use client"` salvo que usen `useState`/`useEffect` directamente (varios lo hacen, para estado local de popups/apertura — eso está bien e intencional, no es un boundary que haya que quitar).

**El estado está dividido en varios stores de Zustand pequeños por dominio**, no un solo blob compartido — `src/store/`:
- `client-store.ts` — qué cliente está activo (`"all"` o un id de cliente); acota casi todo lo demás. No tiene relación con `clients-store.ts` de abajo — este solo guarda la selección actual.
- `clients-store.ts` — la lista de clientes, traída de Supabase (`fetchClientes`); reemplaza el viejo array estático `CLIENTES`.
- `content-store.ts` — las piezas de contenido, ahora async y respaldadas por Supabase: `fetchContenidos`, `createContenido`/`updateContenido` (insert/update + la RPC `set_contenido_tags` para etiquetas), `deleteContenido`, `approveContenido`/`requestChanges` (las acciones del portal, ambas RPCs) — mismos nombres de acción que la versión en memoria anterior, así que los call sites casi solo necesitaron agregar `await`.
- `library-filters-store.ts` — filtros de búsqueda/estado/red/tipo/orden/vista/mes del calendario para la biblioteca de contenido.
- `ui-store.ts` — módulo activo, sidebar colapsado/abierto en móvil, visibilidad del panel de detalles.
- `modal-store.ts` — estado abierto del editor/preview + qué id de contenido (`string`/uuid, ya no `number`).
- `toast-store.ts` — el mensaje de toast puntual.

  **Gotcha ya identificado:** un selector de Zustand no debe asignar un array/objeto nuevo en cada llamada (ej. `useContentStore(s => s.contenidos.filter(...))`). Eso rompe la comparación de snapshot de `useSyncExternalStore` y tira "The result of getSnapshot should be cached" en runtime (no lo detecta `tsc` ni `next build`). Patrón usado en todo el repo: seleccionar el array crudo del store, y derivar con `useMemo` en el cuerpo del componente (ver `src/hooks/use-filtered-content.ts` o `src/components/portal/portal-dashboard.tsx`).

**Capa de datos**: el contenido y los clientes viven en Supabase (`supabase/migrations/0001_init.sql` para el esquema, `supabase/seed.sql` para el único cliente real — `supabase/seed-demo.sql` tiene los 4 clientes mockup viejos como fixture de desarrollo opcional, no se corre por defecto). `src/data/` ahora solo tiene lo que de verdad es estático: `networks.ts` (metadata de redes sociales, incl. ícono de lucide y color de marca), `content-types.ts` (enums de estado/formato/tipoEditorial/peso, refleja los enums de Postgres), `team.ts`, `nav-items.ts`, `placeholder-copy.ts`. `src/data/clients.ts` es un re-export delgado sobre `clients-store.ts` + un helper `findCliente`, se mantiene solo para no tener que renombrar todos los imports existentes. `src/lib/supabase/` (clientes de navegador y de servidor) y `src/lib/mappers/` (filas snake_case de la BD ↔ tipos camelCase de la app en `src/types/content.ts`) son el límite entre Postgres y la app. `src/types/database.ts` refleja a mano las formas de las filas de la BD (no hay proyecto de Supabase enlazado para generarlo con `supabase gen types` en este entorno).

**Estilos**: Tailwind v4, tokens definidos como custom properties de CSS en `src/app/globals.css` bajo `@theme` (`:root` plano) y redefinidos bajo `.dark` — no el patrón de dark mode solo por media query. El cambio de tema es vía `next-themes` (`attribute="class"`), conectado en `src/components/theme-provider.tsx`. No usar utilidades de espaciado fraccionario de Tailwind fuera de la escala estándar (ej. `h-8.5`, `mt-4.5` no generan nada silenciosamente) — usar valores arbitrarios entre corchetes (`h-[34px]`) en su lugar.

**Gotcha de la versión de Next.js**: este proyecto usa Next.js 16 con el flag experimental `cacheComponents: true` (ver `next.config.ts`) — confirmado en `AGENTS.md` (se regenera solo con `next dev`, seguro de comitear) que esta versión tiene cambios que rompen lo que el training data esperaría. Puntos de friction ya encontrados:
- Un segmento de ruta dinámico debe poder resolver sus `params` en build time (vía `generateStaticParams`) o envolverse para streaming — un Server Component async que simplemente `await`ea `params` directamente falla el prerenderizado si no.
- El export de segmento de ruta `dynamicParams` se rechaza directamente ("not compatible with cacheComponents") — no lo agregues.
- En general: **cualquier** `fetch`/llamada a BD en el cuerpo de un Server Component que no esté envuelta en `<Suspense>` hace fallar el build con "Next.js encountered uncached or runtime data during prerendering" — esto pasó tanto en `/portal` como en `/portal/[clienteId]` en cuanto empezaron a leer de Supabase. Se arregló con el patrón de wrapper-page + componente interno async + `<Suspense>` descrito arriba; `npm run build` confirma que ambas rutas salen como "Partial Prerender", que es el patrón a copiar para cualquier Server Component nuevo que lea datos en vivo.

Ante la duda sobre APIs actuales de Next.js, revisar `node_modules/next/dist/docs/` en vez de confiar en el training data.
