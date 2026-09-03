"use client";

import { useState, useCallback, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidGlassCard from "@/components/LiquidGlassCard";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "juanmanuelramos813@gmail.com";

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path d="M3 11L11 3M5 3H11V9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const pillClass =
  "group flex items-center gap-3 rounded-full border border-black/10 dark:border-white/[0.15] bg-white/[0.07] px-8 py-5 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.12] hover:border-black/20 dark:hover:border-white/25 hover:-translate-y-1 max-sm:px-5 max-sm:py-3 max-sm:justify-center max-lg:px-5 max-lg:py-3 max-lg:justify-center";

function FooterLink({
  icon,
  title,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  href: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={pillClass}>
      {icon}
      <span className="font-clash-grotesk-semibold text-black/80 dark:text-white/80">
        {title}
      </span>
      <ArrowIcon />
    </a>
  );
}

export default function Footer() {
  const builtRef = useRef<HTMLSpanElement>(null);
  const [copied, setCopied] = useState(false);
  const { t } = useLang();

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  useGSAP(() => {
    if (builtRef.current) {
      gsap.fromTo(
        builtRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: builtRef.current,
            start: "top 95%",
            end: "top 85%",
            scrub: 1,
          },
        },
      );
    }
  }, []);

  return (
    <section
      id="contact"
      className="relative flex items-center justify-center overflow-hidden pt-16 pb-24 max-sm:pt-8 max-sm:pb-20 max-lg:pt-8 max-lg:pb-20"
    >
      <LiquidGlassCard
        borderRadius={42}
        className="flex-col w-full px-14 lg:px-20 py-28 items-center justify-center max-sm:px-6 max-sm:py-12 max-lg:px-6 max-lg:py-12"
      >
        <div className="text-center">
          <p className="font-clash-grotesk-semibold tracking-[0.4em] uppercase text-black/80 dark:text-zinc-300 text-sm">
            {t("footer.kicker")}
          </p>

          <h2 className="mt-3 text-[8rem] leading-none font-panchang-bold uppercase text-black dark:text-white max-sm:text-4xl max-lg:text-4xl">
            {t("footer.headline")}
          </h2>

          <p className="font-clash-grotesk-regular mx-auto mt-8 max-w-2xl text-black/70 dark:text-zinc-300 text-lg leading-9 max-sm:text-base max-sm:leading-7 max-lg:text-base max-lg:leading-7">
            {t("footer.blurb")}
          </p>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-6 max-sm:flex-col max-sm:items-stretch max-sm:gap-3 max-lg:flex-col max-lg:items-stretch max-lg:gap-3">
          <FooterLink
            icon={<MailIcon />}
            title={t("footer.email")}
            href={`mailto:${EMAIL}`}
          />
          <FooterLink
            icon={<GithubIcon />}
            title="GitHub"
            href="https://github.com/juanm4ram"
          />
          <FooterLink
            icon={<LinkedinIcon />}
            title="LinkedIn"
            href="https://www.linkedin.com/in/juanmramos3/"
          />
          <button onClick={handleCopy} className={pillClass}>
            <CopyIcon />
            <span className="font-clash-grotesk-semibold">
              {copied ? t("footer.copied") : t("footer.copyEmail")}
            </span>
            <ArrowIcon />
          </button>
        </div>

        <div className="mt-20 flex w-full items-center gap-6">
          <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
          <span className="font-panchang-bold text-lg text-black/70 dark:text-white/70">
            JMR
          </span>
          <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
        </div>

        <p className="font-clash-grotesk-regular mt-8 text-center text-black/70 dark:text-zinc-400 max-sm:text-sm max-lg:text-sm">
          {t("footer.thanks")}
        </p>

        <div className="mt-20 flex w-full justify-between text-sm text-black/60 dark:text-zinc-500 font-clash-grotesk-regular max-sm:mt-12 max-sm:flex-col max-sm:items-center max-sm:gap-1 max-lg:mt-12 max-lg:flex-col max-lg:items-center max-lg:gap-1">
          <span>&copy; 2026 Juan Manuel Ramos</span>
          <span ref={builtRef}>{t("footer.built")}</span>
        </div>
      </LiquidGlassCard>
    </section>
  );
}
