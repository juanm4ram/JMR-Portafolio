# Portfolio — Juan Manuel Ramos

[Español](README.md) · **English**

Personal portfolio of **Juan Manuel Ramos**, a backend-focused software developer.
A single-page site, bilingual (Spanish / English), with light and dark modes.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=black)](https://gsap.com/)

![Hero in dark mode](docs/hero-dark.png)

---

## Contents

- [What's inside](#whats-inside)
- [Stack](#stack)
- [Screenshots](#screenshots)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Adding or editing a project](#adding-or-editing-a-project)
- [Translations](#translations)
- [Icons](#icons)
- [Deployment](#deployment)
- [Contact](#contact)
- [Credits and licence](#credits-and-licence)

---

## What's inside

| | |
|---|---|
| 🌐 **Bilingual** | Starts in the visitor's browser language and can be switched with the `ES/EN` button. The choice is remembered between visits. |
| 🌗 **Light and dark** | Follows the system preference, with a manual toggle. |
| 🗂️ **Project sheets** | Every card opens a modal with context, impact, features and stack. |
| 🎬 **Live preview** | Cards play a walkthrough of the real site on hover (or when centred on screen, on mobile). |
| 📊 **GitHub activity** | Contribution calendar for the past year, sized to fit the space available. |
| ✨ **Animation** | Smooth scrolling with Lenis, headings and parallax via GSAP ScrollTrigger, *liquid glass* cards. |
| 📱 **Responsive** | Built for mobile, tablet and desktop. |

## Stack

**Framework** — Next.js 16 (App Router) · React 19 · TypeScript 5
**Styling** — Tailwind CSS v4 · local fonts (Panchang, Clash Grotesk, Expose)
**Animation** — GSAP + ScrollTrigger · Framer Motion · Lenis
**Other** — `react-activity-calendar` · `lucide-react` · brand icons via [Simple Icons](https://simpleicons.org/)

## Screenshots

<details>
<summary>See more screenshots</summary>

**Hero in light mode**

![Hero in light mode](docs/hero-light.png)

**Projects**

![Projects section](docs/projects.png)

**Tools**

![Tools section](docs/tools.png)

</details>

## Getting started

Requirements: **Node.js 20 or newer**.

```bash
npm install
npm run dev      # http://localhost:3000
```

Other commands:

```bash
npm run build    # production build
npm start        # serve the build
npm run lint     # ESLint
```

## Project structure

```
app/
  layout.tsx           metadata, fonts, animated background, providers
  page.tsx             composes the sections
  globals.css          base styles and font variables
  fonts.ts             local font loading

sections/
  Hero.tsx             intro, tech stack and GitHub activity
  Projects.tsx         project grid + detail modal
  tools.tsx            stack grouped by category

components/
  projectCard.tsx      card with video preview
  projectDetail.tsx    modal with impact, features and stack
  GitHubCommits.tsx    contribution calendar
  BottomNav.tsx        floating nav, language and theme
  LiquidGlassCard.tsx  glass-effect cards
  GlassSurface.tsx     glass surface used by the nav
  tech-icons.tsx       SVG icons for the hero carousel
  logo-carousel.tsx    animated technology carousel
  preloader.tsx        loading screen
  lenis-provider.tsx   smooth scrolling

lib/
  i18n.tsx             ES/EN dictionaries and language context
  projects.ts          project types and slug list
  utils.ts             helpers

public/
  projects/<slug>/     image.png · showcase.webm · project.json
  icons/               custom monochrome logos
  fonts/               woff2 font files
  background-*.webm    animated background (light and dark)
  avatar.jpg           profile photo
```

## Adding or editing a project

Each project lives in its own folder under `public/projects/`. No component changes are
needed — just the files plus one line in `lib/projects.ts`.

**1. Create the folder** `public/projects/my-project/` containing:

| File | Required | Details |
|---|---|---|
| `image.png` | Yes | Square image, ideally 900 × 900 px. |
| `project.json` | Yes | The project's content (see below). |
| `showcase.webm` | No | 16:9 video played on hover. |

**2. Write `project.json`:**

```json
{
  "title": "My Project",
  "tags": ["Node.js", "TypeScript"],
  "stack": ["Node.js", "TypeScript", "PostgreSQL"],
  "githubUrl": "https://github.com/juanm4ram/my-project",
  "previewUrl": "https://my-project.com",
  "hasVideo": true,
  "es": {
    "subtitle": "Subtítulo corto",
    "description": "Una línea para la tarjeta.",
    "overview": "Párrafo de contexto para el modal.",
    "impact": "El resultado concreto del proyecto.",
    "features": ["Primera funcionalidad", "Segunda funcionalidad"]
  },
  "en": {
    "subtitle": "Short subtitle",
    "description": "One line for the card.",
    "overview": "Context paragraph for the modal.",
    "impact": "The concrete outcome of the project.",
    "features": ["First feature", "Second feature"]
  }
}
```

`title`, `tags`, `stack` and the URLs are shared across both languages.
`githubUrl` and `previewUrl` are optional — if missing, the matching icon is hidden.
`hasVideo` is only needed when you include a `showcase.webm`.

**3. Register the slug** in `lib/projects.ts`:

```ts
export const projectSlugs = ["erexit-3d", "afrikisima", "redes-neuronales", "my-project"];
```

## Translations

Every piece of interface copy comes from `lib/i18n.tsx`. To add one:

```ts
const es = {
  // …
  "footer.newLine": "Texto nuevo",
} as const;
```

The key type is derived from the Spanish dictionary, so **TypeScript will error until
you add the same key to `en`**. Then use it like this:

```tsx
const { t } = useLang();
<p>{t("footer.newLine")}</p>
```

The language is resolved in this order: whatever is stored in `localStorage` → the
browser language (`navigator.languages`) → English as a last resort.

## Icons

- **Well-known brands:** `https://cdn.simpleicons.org/<slug>/<color>`, falling back to
  the initial inside a circle when the icon fails to load.
- **Concepts with no brand** (REST APIs, webhooks, virtual machines…): icons from
  [lucide-react](https://lucide.dev/).
- **Brands Simple Icons doesn't carry** (Heroku, Google Workspace, Microsoft Office):
  monochrome PNGs in `public/icons/`, tinted with `filter: invert(1)` in dark mode.

## Deployment

This is a standard Next.js app and needs no environment variables.

**Vercel** — import the repository from GitHub; the framework is detected automatically
(`next build` as the build command, `.next` as the output directory).

**Anywhere else** — `npm run build`, then `npm start` on Node.js 20+.

## Contact

- 📧 [juanmanuelramos813@gmail.com](mailto:juanmanuelramos813@gmail.com)
- 💼 [linkedin.com/in/juanmramos3](https://www.linkedin.com/in/juanmramos3/)
- 💻 [github.com/juanm4ram](https://github.com/juanm4ram)

## Credits and licence

The base design comes from [portfolio-2026](https://github.com/yass-gr/portfolio-2026)
by Yassine Grairi. The content, projects, tools section, bilingual system and imagery
are my own.

The Panchang, Clash Grotesk and Expose typefaces are by
[Indian Type Foundry / Fontshare](https://www.fontshare.com/) and used under their licence.
