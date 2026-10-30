# Publifya

Frontend de un CMS para agencias que gestionan contenido de **múltiples clientes** en **múltiples redes sociales** y **múltiples tipos de contenido**. Este repositorio contiene únicamente la interfaz: los datos viven en memoria (`src/data/` + Zustand) para poder navegar la aplicación con información de ejemplo mientras no exista un backend.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (tokens de diseño en `src/app/globals.css`, modo claro/oscuro)
- **Zustand** para el estado (dividido en stores pequeños por dominio)
- **lucide-react** para iconografía
- **next-themes** para el cambio de tema

Pensado para desplegarse en **Vercel** directamente desde un repositorio de **GitHub**: no requiere configuración adicional, `next build` es el build command por defecto que Vercel detecta.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de producción
npm run lint    # eslint
```

## Arquitectura

Cada pieza de UI vive en su propio archivo pequeño para poder cambiar una parte sin tocar archivos grandes:

```
src/
├── app/                       # Next.js App Router (layout, página, estilos globales)
├── components/
│   ├── ui/                    # Primitivas reutilizables (botones, pills, badges, campos de formulario, popups)
│   ├── layout/
│   │   ├── sidebar/           # Logo, selector de cliente, navegación, tarjeta de usuario
│   │   ├── topbar/            # Breadcrumb, búsqueda, tema, notificaciones, menú de usuario
│   │   └── details-panel/     # Panel de detalles del contenido seleccionado
│   ├── modules/
│   │   ├── content-library/   # Biblioteca de contenido: tabs, filtros, toolbar, vistas (tabla/cuadrícula/calendario)
│   │   ├── overview/          # Módulo "Resumen"
│   │   ├── clients/           # Módulo "Clientes"
│   │   └── placeholder/       # Módulos reservados (Plantillas, Flujo de trabajo, etc.)
│   ├── modals/                # Editor y vista previa de contenido
│   └── app-shell.tsx          # Único punto de entrada "use client" que ensambla todo
├── store/                      # Zustand: cliente activo, contenidos, filtros de biblioteca, UI, modales, toast
├── data/                       # Datos de ejemplo: clientes, redes, tipos de contenido, equipo, contenidos
├── hooks/                      # Lógica derivada reutilizable (filtrado, sincronización de selección)
├── lib/                        # Utilidades puras (formato de fecha, iniciales)
└── types/                      # Tipos compartidos (Contenido, Cliente, Red, Estado, Tipo)
```

Cada store de Zustand (`src/store/*.ts`) cubre un único dominio (cliente activo, contenidos, filtros, UI, modales, toast), así que agregar un campo nuevo o un flujo nuevo no obliga a tocar el resto del estado.

## Multi-cliente y multi-red

El selector de cliente en la barra lateral cambia el contexto de toda la aplicación (biblioteca, resumen y módulo de clientes). Cada elemento de contenido está asociado a un cliente, una red social o canal (Instagram, Facebook, TikTok, X, LinkedIn, YouTube, blog, email o sitio web) y un tipo de contenido (publicación, historia, reel, carrusel, video, artículo, newsletter, infografía).

## `legacy-static-prototype/`

Prototipo original en HTML/CSS/JS vanilla, usado como referencia visual antes de migrar a este stack. No forma parte de la app de Next.js.

## Próximos pasos sugeridos

- Conectar `src/data/mock-content.ts` y los demás datos de ejemplo a una API real.
- Autenticación y permisos por cliente/miembro del equipo.
- Persistencia real de los cambios (actualmente solo viven en memoria del navegador).

## Desplegar

1. Sube este repositorio a GitHub.
2. En [vercel.com/new](https://vercel.com/new), importa el repositorio — Vercel detecta Next.js automáticamente, sin configuración adicional.
