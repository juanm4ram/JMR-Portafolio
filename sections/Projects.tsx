"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidGlassCard from "@/components/LiquidGlassCard";
import ProjectCard from "@/components/projectCard";
import ProjectDetail from "@/components/projectDetail";
import {
  localize,
  projectSlugs,
  type Project,
  type ProjectData,
} from "@/lib/projects";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const { lang, t } = useLang();

  useEffect(() => {
    Promise.all(
      projectSlugs.map(async (slug) => {
        const res = await fetch(`/projects/${slug}/project.json`);
        const data: ProjectData = await res.json();
        return { ...data, slug };
      }),
    ).then(setProjects);
  }, []);

  const localized = useMemo(
    () => projects.map((p) => localize(p, lang)),
    [projects, lang],
  );

  useGSAP(() => {
    if (!sectionRef.current || !titleRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 640px) and (max-width: 1023px)",
        isMobile: "(max-width: 639px)",
      },
      (context) => {
        const conditions = context.conditions as Record<string, boolean>;

        const from = conditions.isDesktop
          ? { fontSize: "3vw", x: 0 }
          : conditions.isTablet
            ? { fontSize: "1.5vw", x: "-0.5%" }
            : { fontSize: "1vw", x: "-3%" };

        const to = conditions.isDesktop
          ? { fontSize: "6.5vw", x: "24dvw" }
          : conditions.isTablet
            ? { fontSize: "8vw", x: "20dvw" }
            : { fontSize: "10vw", x: "11dvw" };

        gsap.fromTo(titleRef.current, from, {
          ...to,
          ease: "power1.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 0,
          },
        });
      },
    );
  }, []);

  const openProject = localized.find((p) => p.slug === openSlug) ?? null;
  const chips = [t("projects.chip1"), t("projects.chip2"), t("projects.chip3")];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="min-h-dvh p-5 max-sm:pt-[15vh] max-lg:pt-[15vh]"
    >
      <h1 ref={titleRef} className="font-panchang-bold text-center text-5xl">
        {t("projects.title")}
      </h1>

      <LiquidGlassCard className="mt-4">
        <div className="min-h-dvh p-5 grid grid-cols-12 py-[100px] max-sm:grid-cols-1 max-sm:py-6 max-sm:p-3 max-lg:grid-cols-1 max-lg:py-6 max-lg:p-3">
          <div className="text-2xl col-span-3 mt-20 ml-8 sticky top-40 h-fit max-sm:col-span-1 max-sm:static max-sm:text-lg max-sm:mb-6 max-sm:px-4 max-sm:mt-4 max-sm:ml-4 max-lg:col-span-1 max-lg:static max-lg:text-lg max-lg:mb-6 max-lg:px-4 max-lg:mt-4 max-lg:ml-4">
            <div className="text-left">
              <h2 className="font-clash-grotesk-regular leading-15">
                {t("projects.iWorkOn")}{" "}
                {chips.map((item, i) => (
                  <span key={item}>
                    <span
                      className={`outline rounded-full m-2 inline-block leading-none px-4 py-3 transition-all duration-200 ease-in-out hover:rotate-0 ${
                        i === 0 ? "rotate-3" : i === 1 ? "-rotate-2" : "rotate-1"
                      }`}
                    >
                      {item}
                    </span>
                    <br />
                  </span>
                ))}
              </h2>
              <h2 className="font-clash-grotesk-regular">
                {t("projects.andEverything")} <br />
                {t("projects.inBetween")}
              </h2>
            </div>
          </div>
          <div className="col-span-9 grid grid-cols-2 gap-8 content-start p-4 max-sm:col-span-1 max-sm:grid-cols-1 max-sm:gap-4 max-sm:p-0 max-lg:col-span-1 max-lg:grid-cols-1 max-lg:gap-6 max-lg:p-4 max-lg:mx-auto">
            {localized.map((project) => (
              <ProjectCard key={project.slug} {...project} onOpen={setOpenSlug} />
            ))}
            <div className="col-span-full flex justify-center mt-12">
              <a
                href="https://github.com/juanm4ram?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="font-clash-grotesk-semibold text-lg px-6 py-3 rounded-full outline outline-1 outline-black/20 dark:outline-white/20 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 max-sm:text-sm max-sm:px-4 max-sm:py-2"
              >
                {t("projects.seeMore")}
              </a>
            </div>
          </div>
        </div>
      </LiquidGlassCard>

      <ProjectDetail project={openProject} onClose={() => setOpenSlug(null)} />
    </section>
  );
}
