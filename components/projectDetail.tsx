"use client";

import { useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { iconSlugs, type LocalizedProject } from "@/lib/projects";
import { useLang } from "@/lib/i18n";

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8">
      <span className="text-xs font-clash-grotesk-semibold uppercase tracking-widest text-neutral-500">
        {label}
      </span>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export default function ProjectDetail({
  project,
  onClose,
}: {
  project: LocalizedProject | null;
  onClose: () => void;
}) {
  const { t } = useLang();

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/50 p-6 backdrop-blur-md max-sm:p-3"
      data-lenis-prevent
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="relative my-10 w-full max-w-3xl rounded-[42px] border border-black/10 bg-white/90 p-12 text-black shadow-2xl dark:border-white/15 dark:bg-neutral-950/90 dark:text-white max-sm:my-4 max-sm:rounded-[28px] max-sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={t("detail.close")}
          className="absolute right-6 top-6 rounded-full border border-black/10 p-2 text-neutral-500 transition-colors hover:text-black dark:border-white/15 dark:hover:text-white max-sm:right-4 max-sm:top-4"
        >
          <X size={18} />
        </button>

        <div className="overflow-hidden rounded-[28px] max-sm:rounded-[20px]">
          <img
            src={`/projects/${project.slug}/image.png`}
            alt={project.title}
            className="aspect-[16/10] w-full object-cover"
          />
        </div>

        <h2 className="font-panchang-bold mt-8 text-4xl max-sm:text-2xl">
          {project.title}
        </h2>
        {project.subtitle && (
          <p className="font-clash-grotesk-semibold mt-1 text-neutral-500">
            {project.subtitle}
          </p>
        )}

        <p className="font-clash-grotesk-regular mt-6 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 max-sm:text-base">
          {project.overview ?? project.description}
        </p>

        {project.impact && (
          <Section label={t("detail.impact")}>
            <p className="font-clash-grotesk-semibold text-xl max-sm:text-lg">
              {project.impact}
            </p>
          </Section>
        )}

        {project.features && project.features.length > 0 && (
          <Section label={t("detail.features")}>
            <ul className="font-clash-grotesk-regular space-y-2 text-neutral-700 dark:text-neutral-300">
              {project.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-neutral-400" />
                  {f}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {project.stack && project.stack.length > 0 && (
          <Section label={t("detail.stack")}>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => {
                const icon = iconSlugs[s];
                return (
                  <span
                    key={s}
                    className="font-clash-grotesk-regular flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm dark:border-white/15 dark:bg-white/10"
                  >
                    {icon && (
                      <img
                        src={`https://cdn.simpleicons.org/${icon}`}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        className="size-4"
                      />
                    )}
                    {s}
                  </span>
                );
              })}
            </div>
          </Section>
        )}

        {(project.previewUrl || project.githubUrl) && (
          <div className="mt-10 flex flex-wrap gap-3">
            {project.previewUrl && (
              <a
                href={project.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-clash-grotesk-semibold group flex items-center gap-2 rounded-full bg-black px-6 py-3 text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-black"
              >
                {t("detail.visit")}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-clash-grotesk-semibold group flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 transition-transform hover:-translate-y-0.5 dark:border-white/20"
              >
                {t("detail.code")}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
