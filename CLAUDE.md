# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Publifya: a CMS for an agency managing social content for multiple end clients. Backed by Supabase (Postgres) — see "Data layer" below. `supabase/schema-proposal.md` is the original historical design doc (kept for context); the schema actually implemented is `supabase/migrations/0001_init.sql` + `supabase/seed.sql`. No auth yet: both the admin panel and the client portal are open access, same trust model as the old mock-data version — portal mutations (approve/request changes) go through Postgres RPCs instead of raw `UPDATE` to keep the business rule enforced without a login.

## Pendientes

- **Verificar front Publifya vs publifyacopia** (agregado 2026-11-04): existe una copia del proyecto en `C:\Users\ra-cs\proyectos\publifyacopia` con mejor front y diseño. Falta comparar y decidir qué llevarse de ahí a este repo. **Nota: solo front/diseño** — no portar su lógica de datos/backend, este repo ya tiene su propio esquema de Supabase funcionando.

## Commands

```bash
npm run dev      # dev server (Turbopack). Picks the next free port if 3000 is busy — read its "Local:" line, don't assume 3000.
npm run build    # production build; also runs the TypeScript check and prerenders static params
npm run lint     # eslint (flat config, eslint-config-next)
npx tsc --noEmit # type-check only, faster than a full build
```

Requires `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API in Supabase) — `npm run build`/`npm run dev` throw at module load without them (`src/lib/supabase/client.ts`). On Vercel these must be set in Project Settings → Environment Variables; `.env.local` is gitignored and never reaches a deploy on its own.

There is no test setup in this repo (no Jest/Vitest config, no test files).

`legacy-static-prototype/` is excluded from lint (see `eslint.config.mjs` ignores) — it's a vanilla HTML/CSS/JS mockup kept only as a visual reference, not part of the Next.js app.

## Architecture

**Two separate route trees under one Next.js app:**
- `/` — the internal admin panel the agency's team uses (sidebar + topbar + content library/overview/clients modules). Entirely driven by `src/components/app-shell.tsx`.
- `/portal` and `/portal/[clienteId]` — a separate, stripped-down experience for the agency's *end clients*. No sidebar, no cross-client visibility. Clients live in Supabase now, not a static array, so there's no `generateStaticParams` — both portal routes are async Server Components that fetch from Supabase per request. Under `cacheComponents` (see Next.js gotcha below) that fetch can't happen directly in the page body, so each route is a thin wrapper (`page.tsx`, no `await`) around an inner async Server Component wrapped in `<Suspense>` (`portal-picker-content.tsx` / `[clienteId]/portal-client-content.tsx`) — this is the Partial Prerendering pattern `partialPrefetching: true` in `next.config.ts` is asking for.

Both trees read/write the **same** Zustand stores, which are now thin wrappers over Supabase (fetch on mount, mutate via `supabase-js`) rather than plain in-memory arrays — e.g. approving content in `/portal` calls the `approve_content` RPC, which the admin panel's details panel picks up on its own next fetch. No auth: this is app-level convention (RPC instead of raw `UPDATE`), not identity-based security.

**Single `"use client"` boundary.** `src/components/app-shell.tsx` is the only client-boundary entry point for the admin tree; everything it imports is transitively part of the client bundle, so leaf components don't need their own `"use client"` directive unless they use `useState`/`useEffect` directly (several do, for local popup/open state — that's fine and intentional, not a boundary that needs removing).

**State is split into small Zustand stores by domain**, not one shared blob — `src/store/`:
- `client-store.ts` — which client is active (`"all"` or a client id); scopes almost everything else. Unrelated to `clients-store.ts` below — this one just holds the current selection.
- `clients-store.ts` — the list of clients, fetched from Supabase (`fetchClientes`); replaces the old static `CLIENTES` array.
- `content-store.ts` — the content items, now async and Supabase-backed: `fetchContenidos`, `createContenido`/`updateContenido` (insert/update + `set_contenido_tags` RPC for tags), `deleteContenido`, `approveContenido`/`requestChanges` (the portal's actions, both RPCs) — same action names as the old in-memory version so call sites mostly just needed `await`.
- `library-filters-store.ts` — search/estado/red/tipo/sort/view/calendar-month filters for the content library.
- `ui-store.ts` — active module, sidebar collapsed/mobile-open, details panel visibility.
- `modal-store.ts` — editor/preview modal open state + which content id (`string`/uuid, not `number`).
- `toast-store.ts` — the one-off toast message.

  **Gotcha already hit once:** a Zustand selector must not allocate a new array/object every call (e.g. `useContentStore(s => s.contenidos.filter(...))`). That breaks `useSyncExternalStore`'s snapshot comparison and throws "The result of getSnapshot should be cached" at runtime (not caught by `tsc` or `next build`). Pattern used everywhere in this repo: select the raw array from the store, then derive with `useMemo` in the component body (see `src/hooks/use-filtered-content.ts` or `src/components/portal/portal-dashboard.tsx`).

**Data layer**: content and clients live in Supabase (`supabase/migrations/0001_init.sql` for the schema, `supabase/seed.sql` for the one real client — `supabase/seed-demo.sql` has the old 4 mockup clients as an optional, not-run-by-default dev fixture). `src/data/` now only holds what's genuinely static: `networks.ts` (social network metadata incl. lucide icon + brand color), `content-types.ts` (estado/formato/tipoEditorial/peso enums, mirrors the Postgres enums), `team.ts`, `nav-items.ts`, `placeholder-copy.ts`. `src/data/clients.ts` is a thin re-export over `clients-store.ts` + a `findCliente` lookup helper, kept only so existing imports didn't all need renaming. `src/lib/supabase/` (browser + server clients) and `src/lib/mappers/` (snake_case DB rows ↔ camelCase app types in `src/types/content.ts`) are the boundary between Postgres and the app. `src/types/database.ts` mirrors the DB row shapes by hand (no linked Supabase project to `supabase gen types` from in this environment).

**Styling**: Tailwind v4, tokens defined as CSS custom properties in `src/app/globals.css` under `@theme` (bare `:root`) and redefined under `.dark` — not the media-query-only dark mode pattern. Theme switching is via `next-themes` (`attribute="class"`), wired in `src/components/theme-provider.tsx`. Don't use fractional Tailwind spacing utilities outside the standard scale (e.g. `h-8.5`, `mt-4.5` silently fail to generate) — use bracket arbitrary values (`h-[34px]`) instead.

**Next.js version gotcha**: this project uses Next.js 16 with the experimental `cacheComponents: true` flag (see `next.config.ts`) — confirmed in `AGENTS.md` (auto-regenerated by `next dev`, safe to commit) that this version has breaking changes from what training data expects. Known friction points hit so far:
- A dynamic route segment's `params` must be resolvable at build time (via `generateStaticParams`) or wrapped for streaming — an async Server Component that just `await`s `params` directly fails prerendering otherwise.
- The `dynamicParams` route-segment export is rejected outright ("not compatible with cacheComponents") — don't add it.
- More generally: **any** `fetch`/DB call in a Server Component's body that isn't wrapped in `<Suspense>` fails the build with "Next.js encountered uncached or runtime data during prerendering" — hit this on both `/portal` and `/portal/[clienteId]` once they started reading Supabase. Fixed by the wrapper-page + inner-async-component + `<Suspense>` split described above; `npm run build` confirms both routes come out as "Partial Prerender", which is the pattern to copy for any new Server Component that reads live data.

When in doubt about current Next.js APIs, check `node_modules/next/dist/docs/` rather than relying on training data.
