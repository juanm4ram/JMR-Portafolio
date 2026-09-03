"use client";

import { useRef, useState, useEffect, type ComponentType } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Braces,
  Database,
  RefreshCw,
  Rocket,
  Server,
  Sparkles,
  Table2,
  Terminal,
  Webhook,
  type LucideProps,
} from "lucide-react";
import LiquidGlassCard from "@/components/LiquidGlassCard";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

type TKey = Parameters<ReturnType<typeof useLang>["t"]>[0];

interface Tool {
  /** Texto literal (nombres propios que no se traducen). */
  name?: string;
  /** Clave del diccionario, para lo que sí se traduce. */
  key?: TKey;
  /** Slug de simple-icons, servido desde su CDN. */
  slug?: string;
  /** PNG monocromo propio en /icons (para marcas que simple-icons no tiene). */
  img?: string;
  /** Icono de lucide, para conceptos que no son una marca. */
  Icon?: ComponentType<LucideProps>;
}

interface Bucket {
  key: TKey;
  tools: Tool[];
}

const buckets: Bucket[] = [
  {
    key: "tools.languages",
    tools: [
      { name: "Java", slug: "openjdk" },
      { name: "Python", slug: "python" },
      { name: "JavaScript", slug: "javascript" },
      { name: "SQL", Icon: Database },
      { name: "C", slug: "c" },
      { name: "C++", slug: "cplusplus" },
    ],
  },
  {
    key: "tools.backend",
    tools: [
      { name: "Node.js", slug: "nodedotjs" },
      { key: "tool.restApis", Icon: Braces },
      { key: "tool.webhooks", Icon: Webhook },
      { key: "tool.async", Icon: RefreshCw },
      { key: "tool.dbConnection", Icon: Database },
    ],
  },
  {
    key: "tools.data",
    tools: [
      { name: "SQL Server", Icon: Database },
      { name: "Firestore", slug: "firebase" },
      { name: "Microsoft Excel", Icon: Table2 },
    ],
  },
  {
    key: "tools.infra",
    tools: [
      { key: "tool.vms", Icon: Server },
      { name: "Docker", slug: "docker" },
      { name: "Linux", slug: "linux" },
      { key: "tool.deploy", Icon: Rocket },
      { name: "Google Cloud", slug: "googlecloud" },
      { name: "Heroku", img: "/icons/heroku.png" },
      { key: "tool.servers", Icon: Server },
    ],
  },
  {
    key: "tools.tooling",
    tools: [
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
      { name: "Postman", slug: "postman" },
      { name: "IntelliJ IDEA", slug: "intellijidea" },
      { name: "Cursor", slug: "cursor" },
      { name: "Visual Studio Code", slug: "vscodium" },
      { name: "Google Workspace", img: "/icons/workspace.png" },
      { name: "Microsoft Office", img: "/icons/office.png" },
    ],
  },
  {
    key: "tools.ai",
    tools: [
      { name: "Claude Code / Cowork", slug: "claude" },
      { name: "Codex", Icon: Terminal },
      { name: "OpenCode", slug: "opencode" },
      { name: "GitHub Copilot", slug: "githubcopilot" },
      { name: "LangGraph", slug: "langgraph" },
      { name: "Model Context Protocol", slug: "modelcontextprotocol" },
      { key: "tool.functionCalling", Icon: Braces },
      { name: "RAG", Icon: Sparkles },
      { key: "tool.vectorDbs", Icon: Database },
    ],
  },
];

function ToolPill({ tool, isDark }: { tool: Tool; isDark: boolean }) {
  const [iconFailed, setIconFailed] = useState(false);
  const { t } = useLang();
  const label = tool.name ?? (tool.key ? t(tool.key) : "");
  const iconColor = isDark ? "ffffff" : "000000";
  const Icon = tool.Icon;

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
      {Icon ? (
        <Icon aria-hidden className="size-5 max-sm:size-4" strokeWidth={1.75} />
      ) : tool.img ? (
        <img
          src={tool.img}
          alt=""
          aria-hidden
          loading="lazy"
          className="size-5 max-sm:size-4"
          style={{ filter: isDark ? "invert(1)" : "none" }}
        />
      ) : tool.slug && !iconFailed ? (
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
          {label[0]}
        </span>
      )}
      {label}
    </span>
  );
}

export default function Tools() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isDark, setIsDark] = useState(false);
  const { t } = useLang();

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
        {t("tools.title")}
      </h1>

      <LiquidGlassCard className="mt-4 pb-14">
        <div className="pt-14 pb-10 px-10 max-sm:pt-8 max-sm:pb-6 max-sm:px-4 max-lg:pt-8 max-lg:pb-6 max-lg:px-4">
          <p className="font-clash-grotesk-regular text-2xl text-neutral-700 dark:text-neutral-300 pl-6 max-sm:text-base max-sm:pl-2 max-lg:text-base max-lg:pl-2">
            {t("tools.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 items-start gap-6 px-10 pb-5 max-sm:grid-cols-1 max-sm:gap-4 max-sm:px-4 max-lg:grid-cols-1 max-lg:px-4">
          {buckets.map((bucket, i) => (
            <div
              key={bucket.key}
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
                {t(bucket.key)}
              </h3>
              <div className="mt-6 flex flex-wrap gap-2 max-sm:mt-4">
                {bucket.tools.map((tool) => (
                  <ToolPill
                    key={tool.name ?? tool.key}
                    tool={tool}
                    isDark={isDark}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </LiquidGlassCard>
    </section>
  );
}
