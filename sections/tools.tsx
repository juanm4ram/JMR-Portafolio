"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidGlassCard from "@/components/LiquidGlassCard";

gsap.registerPlugin(ScrollTrigger);

interface Tool {
  name: string;
  slug?: string;
}

interface Bucket {
  label: string;
  tools: Tool[];
}

const buckets: Bucket[] = [
  {
    label: "Lenguajes",
    tools: [
      { name: "Java", slug: "openjdk" },
      { name: "Python", slug: "python" },
      { name: "JavaScript", slug: "javascript" },
      { name: "TypeScript", slug: "typescript" },
      { name: "SQL", slug: "postgresql" },
      { name: "C", slug: "c" },
      { name: "C++", slug: "cplusplus" },
    ],
  },
  {
    label: "Backend",
    tools: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Integración de APIs", slug: "openapiinitiative" },
      { name: "Bots de Telegram", slug: "telegram" },
      { name: "Automatización de procesos", slug: "zapier" },
    ],
  },
  {
    label: "Datos",
    tools: [
      { name: "SQL Server" },
      { name: "Firestore", slug: "firebase" },
      { name: "Excel" },
      { name: "Google Sheets", slug: "googlesheets" },
    ],
  },
  {
    label: "Versionado",
    tools: [
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
    ],
  },
  {
    label: "IA y agentes",
    tools: [
      { name: "OpenAI / Codex" },
      { name: "Claude Code", slug: "claude" },
      { name: "Google Gemini", slug: "googlegemini" },
      { name: "LLMs y prompting" },
    ],
  },
  {
    label: "Sistemas y deploy",
    tools: [
      { name: "Linux CLI", slug: "linux" },
      { name: "VirtualBox", slug: "virtualbox" },
      { name: "Heroku" },
      { name: "Google Cloud", slug: "googlecloud" },
    ],
  },
  {
    label: "Entornos",
    tools: [
      { name: "IntelliJ IDEA", slug: "intellijidea" },
      { name: "Cursor", slug: "cursor" },
      { name: "Google Workspace" },
      { name: "Microsoft Office" },
    ],
  },
];

function ToolPill({ tool, isDark }: { tool: Tool; isDark: boolean }) {
  const [iconFailed, setIconFailed] = useState(false);
  const iconColor = isDark ? "ffffff" : "000000";
  const showIcon = Boolean(tool.slug) && !iconFailed;

  return (
    <span
      className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-clash-grotesk-semibold max-sm:gap-1.5 max-sm:px-3 max-sm:py-1.5 max-sm:text-xs ${
        isDark
          ? "border-white/15 bg-white/8 text-white"
          : "border-black/10 bg-black/5 text-black"
      }`}
      style={{
        borderWidth: "1.5px",
        boxShadow: isDark
          ? "0 0 20px rgba(255,255,255,0.06)"
          : "0 0 20px rgba(0,0,0,0.04)",
      }}
    >
      {showIcon ? (
        <img
          src={`https://cdn.simpleicons.org/${tool.slug}/${iconColor}`}
          alt=""
          aria-hidden
          loading="lazy"
          className="size-5 max-sm:size-4"
          onError={() => setIconFailed(true)}
        />
      ) : (
        <span
          aria-hidden
          className="flex size-5 items-center justify-center rounded-full border border-current text-[10px] font-bold max-sm:size-4 max-sm:text-[8px]"
        >
          {tool.name[0]}
        </span>
      )}
      {tool.name}
    </span>
  );
}

export default function Tools() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

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
            ? { fontSize: "2vw", x: "30%" }
            : { fontSize: "2vw", x: "2%" };

        const to = conditions.isDesktop
          ? { fontSize: "6.5vw", x: "-31dvw" }
          : conditions.isTablet
            ? { fontSize: "10vw", x: "-27%" }
            : { fontSize: "10vw", x: "-25%" };

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

  const borderColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.12)";
  const blurBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(230,230,235,0.6)";

  return (
    <section
      ref={sectionRef}
      id="tools"
      className="min-h-dvh px-5 py-3 max-sm:pt-[15vh] max-lg:pt-[15vh]"
    >
      <h1 ref={titleRef} className="font-panchang-bold text-center text-5xl">
        Tools
      </h1>

      <LiquidGlassCard className="mt-4 pb-14">
        <div className="pt-14 pb-10 px-10 max-sm:pt-8 max-sm:pb-6 max-sm:px-4 max-lg:pt-8 max-lg:pb-6 max-lg:px-4">
          <p className="font-clash-grotesk-regular text-2xl text-neutral-700 dark:text-neutral-300 pl-6 max-sm:text-base max-sm:pl-2 max-lg:text-base max-lg:pl-2">
            todo lo que uso para construir
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 px-10 pb-5 max-sm:grid-cols-1 max-sm:gap-4 max-sm:px-4 max-lg:grid-cols-1 max-lg:px-4">
          {buckets.map((bucket, i) => (
            <div
              key={bucket.label}
              className={`rounded-[42px] p-8 max-sm:rounded-[32px] max-sm:p-6 ${
                i === buckets.length - 1 && buckets.length % 2 === 1
                  ? "col-span-2 max-sm:col-span-1 max-lg:col-span-1"
                  : ""
              }`}
              style={{
                border: `1.5px solid ${borderColor}`,
                backgroundColor: blurBg,
              }}
            >
              <h3 className="font-panchang-bold text-3xl text-black dark:text-white max-sm:text-2xl">
                {bucket.label}
              </h3>
              <div className="mt-6 flex flex-wrap gap-2 max-sm:mt-4">
                {bucket.tools.map((tool) => (
                  <ToolPill key={tool.name} tool={tool} isDark={isDark} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </LiquidGlassCard>
    </section>
  );
}
