export interface ProjectData {
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  overview?: string;
  impact?: string;
  features?: string[];
  stack?: string[];
  githubUrl?: string;
  previewUrl?: string;
  hasVideo?: boolean;
}

export type Project = ProjectData & { slug: string };

export const projectSlugs = ["erexit-3d", "afrikisima", "redes-neuronales"];

export const iconSlugs: Record<string, string> = {
  "Node.js": "nodedotjs",
  JavaScript: "javascript",
  TypeScript: "typescript",
  Telegram: "telegram",
  "Telegram Bot API": "telegram",
  Heroku: "heroku",
  "Next.js": "nextdotjs",
  React: "react",
  "Tailwind CSS": "tailwindcss",
  HTML5: "html5",
  CSS: "css",
  Java: "openjdk",
  Python: "python",
  Git: "git",
  GitHub: "github",
  Linux: "linux",
  Firebase: "firebase",
  MathJax: "mathjax",
  Netlify: "netlify",
};
