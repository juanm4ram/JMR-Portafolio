"use client";

import LiquidGlassCard from "@/components/LiquidGlassCard";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Avatar from "@/components/Avatar";
import { LogoCarousel } from "@/components/logo-carousel";
import { GitHubCommits } from "@/components/GitHubCommits";
import { techLogos } from "@/components/tech-icons";
import { useLang } from "@/lib/i18n";

const bio = {
  es: [
    <>
      Hola! me llamo <strong>Juan Manuel</strong> — soy{" "}
      <strong>software developer</strong> orientado a <strong>backend</strong>.
    </>,
    <>
      Trabajo con <strong>Node.js</strong>, <strong>Java</strong>,{" "}
      <strong>Python</strong> y <strong>SQL</strong>; <strong>APIs REST</strong>,{" "}
      <strong>Model Context Protocol (MCP)</strong>, function calling,{" "}
      <strong>RAG</strong> y bases de datos vectoriales.
    </>,
    <>
      Estudio <strong>Inteligencia Artificial</strong> en{" "}
      <strong>Universidad de Palermo</strong>.
    </>,
    <>
      Me apasiona estudiar el funcionamiento de los algoritmos de IA, cómo se
      construyen los agentes y cómo desarrollar software de calidad mediante
      ambos.
    </>,
  ],
  en: [
    <>
      Hi! I&apos;m <strong>Juan Manuel</strong> — a{" "}
      <strong>software developer</strong> focused on <strong>backend</strong>.
    </>,
    <>
      I work with <strong>Node.js</strong>, <strong>Java</strong>,{" "}
      <strong>Python</strong> and <strong>SQL</strong>; <strong>REST APIs</strong>,{" "}
      <strong>Model Context Protocol (MCP)</strong>, function calling,{" "}
      <strong>RAG</strong> and vector databases.
    </>,
    <>
      I study <strong>Artificial Intelligence</strong> at{" "}
      <strong>Universidad de Palermo</strong>.
    </>,
    <>
      I&apos;m fascinated by how AI algorithms work, how agents are built, and
      how to write quality software with both.
    </>,
  ],
};

const words = ["JUAN", "MANUEL", "RAMOS"];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLang();

  useGSAP(() => {
    const ctx = containerRef.current;
    if (!ctx) return;

    const hero = containerRef.current;
    const heroTitle = ctx.querySelector(".hero-title-wrap");
    const glassCard = ctx.querySelector(".glass-card-wrap");

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 640px) and (max-width: 1023px)",
        isMobile: "(max-width: 639px)",
      },
      (context) => {
        const conditions = context.conditions as Record<string, boolean>;
        const scaleVal = conditions.isDesktop
          ? 0.7
          : conditions.isTablet
            ? 0.8
            : 0.85;

        if (heroTitle) {
          gsap.to(heroTitle, {
            opacity: 0,
            scale: scaleVal,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }

        if (glassCard) {
          gsap.to(glassCard, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }
      },
    );
  }, []);

  return (
    <div
      id="about"
      className="relative min-h-dvh flex flex-col pt-10 pb-20 max-sm:pt-4 max-lg:pt-6"
      ref={containerRef}
    >
      <div className="hero-title-wrap flex justify-center mb-0">
        <h1 className="mx-auto text-[6.2vw] font-panchang-extrabold text-center leading-[0.95] max-sm:w-full max-sm:text-[13vw] max-sm:leading-[0.9] max-lg:w-full max-lg:text-[12vw] max-lg:leading-[0.9]">
          {words.map((word, i) => (
            <span
              key={i}
              className={`hero-word inline-block ${
                i < words.length - 1 ? "mr-[0.22em]" : ""
              }`}
            >
              {word}
            </span>
          ))}
        </h1>
      </div>

      <LiquidGlassCard className="glass-card-wrap w-[85%] mx-auto max-sm:w-[92%] max-lg:w-[92%]">
        <div className="grid grid-cols-[20%_80%] grid-rows-[auto_auto_auto_auto] gap-10 items-start max-w-5xl mx-auto py-10 lg:pt-16 px-2 lg:px-8 max-sm:grid-cols-1 max-sm:gap-6 max-sm:py-8 max-sm:pb-14 max-sm:px-4 max-lg:grid-cols-1 max-lg:gap-6 max-lg:py-8 max-lg:pb-14 max-lg:px-4">
          <div className="avatar-cell row-span-4 flex items-center justify-center max-sm:row-span-1 max-sm:mb-2 max-lg:row-span-1 max-lg:mb-2">
            <Avatar />
          </div>
          <p className="font-clash-grotesk-regular text-pretty text-base sm:text-lg md:text-xl leading-relaxed max-sm:text-base max-sm:text-center max-sm:px-2 max-lg:text-base max-lg:text-center max-lg:px-2">
            {bio[lang].map((line, i) => (
              <span key={i} className="hero-line block [&:not(:first-child)]:mt-2">
                {line}
              </span>
            ))}
          </p>
          <div className="tech-stack-cell flex flex-col gap-3">
            <span className="text-xs font-clash-grotesk-semibold uppercase tracking-widest text-neutral-500">
              {t("hero.techStack")}
            </span>
            <LogoCarousel columnCount={3} logos={techLogos} />
          </div>
          <div className="github-cell flex w-full min-w-0 flex-col gap-3">
            <span className="text-xs font-clash-grotesk-semibold uppercase tracking-widest text-neutral-500">
              {t("hero.githubActivity")}
            </span>
            <GitHubCommits />
          </div>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
