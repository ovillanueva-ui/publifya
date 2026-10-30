# Publifya

Frontend de un CMS para agencias que gestionan contenido de **múltiples clientes** en **múltiples redes sociales** y **múltiples tipos de contenido**. Este repositorio contiene únicamente la interfaz (sin backend): los datos viven en memoria dentro de `js/data.js` para poder navegar la aplicación con información de ejemplo.

## Cómo verlo

No requiere instalación ni build. Abre `index.html` directamente en el navegador, o sirve la carpeta con cualquier servidor estático:

```bash
npx serve .
# o
python -m http.server 8080
```

## Estructura

```
publifya/
├── index.html        # Estructura de la aplicación (shell, módulos, modales)
├── css/
│   └── styles.css    # Tokens de diseño (claro/oscuro) y estilos de todos los componentes
├── js/
│   ├── data.js        # Datos de ejemplo: clientes, redes, tipos de contenido, equipo, contenidos
│   └── app.js          # Estado de la app, filtros, render y manejo de eventos
└── assets/            # Reservado para imágenes o íconos propios
```

## Módulos incluidos

- **Resumen** — KPIs generales y desglose de contenido por cliente.
- **Biblioteca de contenido** — tabla, cuadrícula y calendario, con filtros por estado, red social, tipo de contenido, cliente y búsqueda.
- **Calendario editorial** — acceso directo a la vista de calendario de la biblioteca.
- **Clientes** — panel con las cuentas gestionadas y sus métricas; al seleccionar una se filtra toda la biblioteca.
- **Biblioteca multimedia, Plantillas, Flujo de trabajo, Miembros del equipo, Configuración** — módulos reservados para desarrollo futuro.

## Multi-cliente y multi-red

El selector de cliente en la barra lateral cambia el contexto de toda la aplicación (biblioteca, resumen y calendario). Cada elemento de contenido está asociado a un cliente, una red social o canal (Instagram, Facebook, TikTok, X, LinkedIn, YouTube, blog, email o sitio web) y un tipo de contenido (publicación, historia, reel, carrusel, video, artículo, newsletter, infografía).

## Próximos pasos sugeridos

- Conectar `js/data.js` a una API real.
- Autenticación y permisos por cliente/miembro del equipo.
- Persistencia real de los cambios (actualmente se pierden al recargar la página).
