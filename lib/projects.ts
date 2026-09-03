import type { Lang } from "@/lib/i18n";

export interface ProjectCopy {
  subtitle?: string;
  description: string;
  overview?: string;
  impact?: string;
  features?: string[];
}

export interface ProjectData {
  title: string;
  tags: string[];
  stack?: string[];
  githubUrl?: string;
  previewUrl?: string;
  hasVideo?: boolean;
  es: ProjectCopy;
  en: ProjectCopy;
}

export type Project = ProjectData & { slug: string };

/** Aplana un proyecto al idioma pedido. */
export type LocalizedProject = Omit<ProjectData, "es" | "en"> &
  ProjectCopy & { slug: string };

export function localize(project: Project, lang: Lang): LocalizedProject {
  const { es, en, ...rest } = project;
  return { ...rest, ...(lang === "en" ? en : es) };
}

export const projectSlugs = ["erexit-3d", "afrikisima", "redes-neuronales"];

export const iconSlugs: Record<string, string> = {
  "Node.js": "nodedotjs",
  JavaScript: "javascript",
  TypeScript: "typescript",
  Telegram: "telegram",
  "Telegram Bot API": "telegram",
  "Next.js": "nextdotjs",
  React: "react",
  "Tailwind CSS": "tailwindcss",
  HTML5: "html5",
  CSS: "css",
  Python: "python",
  Git: "git",
  GitHub: "github",
  Linux: "linux",
  Firebase: "firebase",
  Netlify: "netlify",
  Docker: "docker",
};
