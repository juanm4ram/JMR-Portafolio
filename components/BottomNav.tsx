"use client";

import { useState, useEffect, useCallback } from "react";
import { User, FolderKanban, Wrench, Mail, Moon, Sun } from "lucide-react";
import GlassSurface from "@/components/GlassSurface";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip";
import { useLang } from "@/lib/i18n";

const navItems = [
  { id: "about", labelKey: "nav.about", icon: <User size={24} /> },
  { id: "projects", labelKey: "nav.projects", icon: <FolderKanban size={24} /> },
  { id: "tools", labelKey: "nav.tools", icon: <Wrench size={24} /> },
  { id: "contact", labelKey: "nav.contact", icon: <Mail size={24} /> },
] as const;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function BottomNav() {
  const [activeItem, setActiveItem] = useState("about");
  const [isDark, setIsDark] = useState(false);
  const { lang, toggle, t } = useLang();

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(e.target.id, e.intersectionRatio);
        let bestId = "";
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId) setActiveItem(bestId);
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleDark = useCallback(() => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
  }, [isDark]);

  const iconButton =
    "rounded-lg p-1.5 max-lg:p-2 text-neutral-500 transition-colors hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200";

  return (
    <nav className="flex justify-center overflow-hidden max-w-full">
      <div className="overflow-hidden">
        <GlassSurface
          width="auto"
          height="auto"
          borderRadius={999}
          backgroundOpacity={0}
          saturation={1.8}
          className="px-3 py-2 max-sm:px-1.5 max-sm:py-1 max-lg:px-4 max-lg:py-2.5 max-w-full"
          style={{ minHeight: "44px" }}
        >
          <div className="flex items-center gap-2 max-sm:gap-1 max-lg:gap-3">
            {navItems.map(({ id, labelKey, icon }) => (
              <Tooltip key={id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      setActiveItem(id);
                      scrollToSection(id);
                    }}
                    aria-label={t(labelKey)}
                    className={`rounded-lg p-1.5 max-lg:p-2 transition-colors ${
                      activeItem === id
                        ? "text-black dark:text-white"
                        : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                    }`}
                  >
                    {icon}
                  </button>
                </TooltipTrigger>
                <TooltipContent>{t(labelKey)}</TooltipContent>
              </Tooltip>
            ))}

            <div className="mx-1 h-4 w-px bg-neutral-300/50 dark:bg-neutral-600/50 max-lg:h-5" />

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggle}
                  className={`${iconButton} font-clash-grotesk-semibold min-w-[36px] text-sm tracking-wide`}
                  aria-label={t("nav.language")}
                >
                  {lang === "es" ? "ES" : "EN"}
                </button>
              </TooltipTrigger>
              <TooltipContent>{t("nav.language")}</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleDark}
                  className={iconButton}
                  aria-label={isDark ? t("nav.lightMode") : t("nav.darkMode")}
                >
                  {isDark ? <Sun size={24} /> : <Moon size={24} />}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {isDark ? t("nav.lightMode") : t("nav.darkMode")}
              </TooltipContent>
            </Tooltip>
          </div>
        </GlassSurface>
      </div>
    </nav>
  );
}
