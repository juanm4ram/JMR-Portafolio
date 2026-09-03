"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "es" | "en";

export const LANGS: Lang[] = ["es", "en"];

const STORAGE_KEY = "portafolio-lang";

/* ------------------------------------------------------------------ */
/* Diccionarios                                                        */
/* ------------------------------------------------------------------ */

const es = {
  "nav.about": "Sobre mí",
  "nav.projects": "Proyectos",
  "nav.tools": "Herramientas",
  "nav.contact": "Contacto",
  "nav.lightMode": "Modo claro",
  "nav.darkMode": "Modo oscuro",
  "nav.language": "Cambiar a inglés",

  "hero.techStack": "Tech Stack",
  "hero.contact": "Contacto",
  "contact.cv": "Ver mi CV",
  "contact.email": "Escribime",
  "contact.qrAlt": "Código QR del portafolio: escaneá para abrirlo en tu teléfono",

  "projects.title": "Projects",
  "projects.iWorkOn": "trabajo en",
  "projects.chip1": "Backend",
  "projects.chip2": "APIs REST",
  "projects.chip3": "Bases de datos",
  "projects.chip4": "MCP",
  "projects.chip5": "Function calling",
  "projects.andEverything": "y todo lo que hay",
  "projects.inBetween": "en el medio.",
  "projects.seeMore": "ver más …",

  "detail.impact": "Impacto",
  "detail.features": "Funcionalidades",
  "detail.stack": "Stack",
  "detail.visit": "Ver el sitio",
  "detail.code": "Código",
  "detail.close": "Cerrar",

  "tools.title": "Tools",
  "tools.subtitle": "todo lo que uso para construir",
  "tools.languages": "Lenguajes",
  "tools.backend": "Backend",
  "tools.data": "Bases de datos y análisis",
  "tools.infra": "Infraestructura / DevOps",
  "tools.tooling": "Herramientas",
  "tools.ai": "IA y agentes",

  "tool.restApis": "APIs REST",
  "tool.webhooks": "Webhooks",
  "tool.async": "Promises / async-await",
  "tool.dbConnection": "Conexión a bases de datos",
  "tool.vms": "Máquinas virtuales",
  "tool.deploy": "Despliegue de aplicaciones",
  "tool.servers": "Configuración de servidores",
  "tool.functionCalling": "Function calling",
  "tool.vectorDbs": "Bases de datos vectoriales",

  "footer.kicker": "Construyamos algo",
  "footer.headline": "Juntos",
  "footer.blurb":
    "Estoy abierto a nuevas oportunidades, proyectos interesantes y colaboraciones. Escribime y lo charlamos.",
  "footer.email": "Escribime",
  "footer.copyEmail": "Copiar email",
  "footer.copied": "¡Copiado!",
  "footer.thanks": "Gracias por llegar hasta acá.",
  "footer.built": "Hecho con Next.js & GSAP",
} as const;

type Key = keyof typeof es;

const en: Record<Key, string> = {
  "nav.about": "About",
  "nav.projects": "Projects",
  "nav.tools": "Tools",
  "nav.contact": "Contact",
  "nav.lightMode": "Light mode",
  "nav.darkMode": "Dark mode",
  "nav.language": "Switch to Spanish",

  "hero.techStack": "Tech Stack",
  "hero.contact": "Contact",
  "contact.cv": "View my CV",
  "contact.email": "Email me",
  "contact.qrAlt": "Portfolio QR code: scan it to open the site on your phone",

  "projects.title": "Projects",
  "projects.iWorkOn": "i work on",
  "projects.chip1": "Backend",
  "projects.chip2": "REST APIs",
  "projects.chip3": "Databases",
  "projects.chip4": "MCP",
  "projects.chip5": "Function calling",
  "projects.andEverything": "and everything",
  "projects.inBetween": "in between.",
  "projects.seeMore": "see more …",

  "detail.impact": "Impact",
  "detail.features": "Features",
  "detail.stack": "Stack",
  "detail.visit": "Visit the site",
  "detail.code": "Code",
  "detail.close": "Close",

  "tools.title": "Tools",
  "tools.subtitle": "everything i build with",
  "tools.languages": "Languages",
  "tools.backend": "Backend",
  "tools.data": "Databases & analysis",
  "tools.infra": "Infrastructure / DevOps",
  "tools.tooling": "Tooling",
  "tools.ai": "AI & agents",

  "tool.restApis": "REST APIs",
  "tool.webhooks": "Webhooks",
  "tool.async": "Promises / async-await",
  "tool.dbConnection": "Database connectivity",
  "tool.vms": "Virtual machines",
  "tool.deploy": "App deployment",
  "tool.servers": "Server configuration",
  "tool.functionCalling": "Function calling",
  "tool.vectorDbs": "Vector databases",

  "footer.kicker": "Let's build something",
  "footer.headline": "Together",
  "footer.blurb":
    "I'm always open to new opportunities, interesting projects and collaborations. Drop me a line.",
  "footer.email": "Email me",
  "footer.copyEmail": "Copy email",
  "footer.copied": "Copied!",
  "footer.thanks": "Thanks for making it to the end.",
  "footer.built": "Built with Next.js & GSAP",
};

const dictionaries: Record<Lang, Record<Key, string>> = { es, en };

/* ------------------------------------------------------------------ */
/* Contexto                                                            */
/* ------------------------------------------------------------------ */

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: (key: Key, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function detectLang(): Lang {
  if (typeof window === "undefined") return "es";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") return stored;
  } catch {
    /* localStorage puede no estar disponible */
  }
  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  for (const l of candidates) {
    if (!l) continue;
    if (l.toLowerCase().startsWith("es")) return "es";
    if (l.toLowerCase().startsWith("en")) return "en";
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Arranca en "es" para que el HTML del servidor y el del cliente coincidan;
  // el idioma real se resuelve en el primer efecto.
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const detected = detectLang();
    setLangState(detected);
    document.documentElement.lang = detected;
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    document.documentElement.lang = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* sin persistencia, no pasa nada */
    }
  }, []);

  const toggle = useCallback(
    () => setLang(lang === "es" ? "en" : "es"),
    [lang, setLang],
  );

  const t = useCallback(
    (key: Key, vars?: Record<string, string | number>) => {
      let out: string = dictionaries[lang][key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          out = out.replaceAll(`{${k}}`, String(v));
        }
      }
      return out;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LanguageProvider>");
  return ctx;
}
