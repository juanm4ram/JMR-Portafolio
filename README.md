# Portafolio — Juan Manuel Ramos

Portafolio personal. Software developer orientado a backend: automatización,
bots de Telegram e integración de APIs.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP · Lenis · Framer Motion

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
npm start
```

## Estructura

```
app/               layout, metadata, fuentes y estilos globales
sections/          Hero, Projects, Tools
components/        tarjetas, modal de proyecto, nav, efectos de vidrio
lib/projects.ts    tipos y lista de proyectos
public/projects/   una carpeta por proyecto: image.png, showcase.webm, project.json
```

## Agregar un proyecto

1. Crear `public/projects/<slug>/` con `image.png` (cuadrada, ~900×900) y,
   opcionalmente, `showcase.webm` (16:9, se reproduce al pasar el mouse).
2. Escribir `project.json` con `title`, `subtitle`, `description`, `tags`,
   `overview`, `impact`, `features`, `stack` y, si corresponde, `githubUrl`,
   `previewUrl` y `hasVideo: true`.
3. Agregar el slug a `projectSlugs` en `lib/projects.ts`.

## Créditos

Basado en el diseño de [portfolio-2026](https://github.com/yass-gr/portfolio-2026)
de Yassine Grairi.
