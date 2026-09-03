"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { site } from "@/lib/site";

function FileIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
      <path d="M14 2v5h5" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function ContactLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  const external = !href.startsWith("mailto:");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="font-clash-grotesk-semibold group flex items-center gap-2.5 rounded-full border border-black/10 bg-black/[0.04] px-4 py-2.5 text-sm text-black/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/25 hover:bg-black/[0.07] dark:border-white/15 dark:bg-white/[0.06] dark:text-white/85 dark:hover:border-white/30 dark:hover:bg-white/[0.1] max-sm:px-3 max-sm:py-2 max-sm:text-xs"
    >
      {icon}
      {label}
      <ArrowUpRight
        size={13}
        className="ml-0.5 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
      />
    </a>
  );
}

export default function ContactCard() {
  const { t } = useLang();

  return (
    <div className="flex items-start gap-5 max-sm:flex-col max-sm:items-center max-sm:gap-4">
      {/*
        Tarjeta blanca en los dos temas: un QR necesita contraste alto para que
        el teléfono lo lea, así que no se invierte con el modo oscuro.
      */}
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        title={site.url}
        className="shrink-0 rounded-2xl bg-white p-2.5 shadow-lg ring-1 ring-black/10 transition-transform duration-300 hover:-translate-y-0.5 max-sm:p-2"
      >
        <Image
          src="/qr-portfolio.svg"
          alt={t("contact.qrAlt")}
          width={104}
          height={104}
          className="size-[104px] max-sm:size-20"
          unoptimized
        />
      </a>

      <div className="grid min-w-0 grid-cols-2 gap-2 max-sm:w-full max-sm:max-w-[260px] max-sm:grid-cols-1">
        <ContactLink
          href={site.cv}
          icon={<FileIcon />}
          label={t("contact.cv")}
        />
        <ContactLink
          href={`mailto:${site.email}`}
          icon={<MailIcon />}
          label={t("contact.email")}
        />
        <ContactLink
          href={site.linkedin}
          icon={<LinkedinIcon />}
          label="LinkedIn"
        />
        <ContactLink href={site.github} icon={<GithubIcon />} label="GitHub" />
      </div>
    </div>
  );
}
