"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { iconSlugs, type LocalizedProject } from "@/lib/projects";

interface ProjectCardProps extends LocalizedProject {
  onOpen?: (slug: string) => void;
}

export default function ProjectCard({
  title,
  slug,
  tags,
  description,
  githubUrl,
  previewUrl,
  hasVideo = false,
  onOpen,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    const media = mediaRef.current;
    const overlay = overlayRef.current;
    const video = videoRef.current;
    const videoWrap = videoWrapRef.current;
    if (!card || !media || !overlay) return;
    if (window.innerWidth < 1024) return;

    gsap.set(overlay, { y: 200 });

    const tl = gsap.timeline({ paused: true });

    tl.to(overlay, { y: 0, duration: 0.7, ease: "power2.out" }, 0);
    tl.to(media, { scale: 1.7, duration: 0.9, ease: "power2.inOut" }, 0);

    if (videoWrap && hasVideo) {
      tl.fromTo(
        videoWrap,
        { opacity: 0, scale: 0.85, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power2.out" },
        0.15,
      );
    }

    const handleEnter = () => {
      if (hasVideo) {
        if (video && !video.src) {
          video.src = `/projects/${slug}/showcase.webm`;
          video.load();
          video.addEventListener("canplay", () => video.play().catch(() => {}), {
            once: true,
          });
        } else {
          video?.play().catch(() => {});
        }
        media.style.filter = "blur(8px)";
      }
      tl.play();
    };

    const handleLeave = () => {
      video?.pause();
      media.style.filter = "blur(0px)";
      tl.reverse();
    };

    card.addEventListener("mouseenter", handleEnter);
    card.addEventListener("mouseleave", handleLeave);

    return () => {
      card.removeEventListener("mouseenter", handleEnter);
      card.removeEventListener("mouseleave", handleLeave);
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    const media = mediaRef.current;
    const video = videoRef.current;
    const videoWrap = videoWrapRef.current;
    if (!card || !media || !hasVideo) return;

    const isMobileOrTablet = window.innerWidth < 1024;
    if (!isMobileOrTablet) return;

    if (videoWrap) {
      videoWrap.style.opacity = "0";
      videoWrap.style.transition = "opacity 0.5s ease";
    }

    const toggleCard = (isCentered: boolean) => {
      if (isCentered) {
        if (videoWrap) videoWrap.style.opacity = "1";

        if (video && !video.src) {
          video.src = `/projects/${slug}/showcase.webm`;
          video.load();
          video.addEventListener(
            "canplay",
            () => {
              const cardEl = cardRef.current;
              const mediaEl = mediaRef.current;
              if (cardEl && mediaEl) {
                const rect = cardEl.getBoundingClientRect();
                const cardCenter = rect.top + rect.height / 2;
                const vpCenter = window.innerHeight / 2;
                if (Math.abs(cardCenter - vpCenter) / vpCenter < 0.3) {
                  mediaEl.style.filter = "blur(8px)";
                  mediaEl.style.transition = "filter 0.5s ease";
                }
              }
              video.play().catch(() => {});
            },
            { once: true },
          );
        } else {
          if (video && video.readyState >= 2) {
            media.style.filter = "blur(8px)";
            media.style.transition = "filter 0.5s ease";
          }
          video?.play().catch(() => {});
        }
      } else {
        media.style.filter = "blur(0px)";
        if (videoWrap) videoWrap.style.opacity = "0";
        video?.pause();
      }
    };

    const onScroll = () => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const vpCenter = window.innerHeight / 2;
      toggleCard(Math.abs(cardCenter - vpCenter) / vpCenter < 0.3);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [slug, hasVideo]);

  return (
    <div
      ref={cardRef}
      onClick={() => onOpen?.(slug)}
      className="relative rounded-[60px] [clip-path:inset(0_round_60px)] cursor-pointer max-sm:rounded-[60px] max-sm:[clip-path:inset(0_round_60px)] max-sm:p-2 max-lg:rounded-[60px] max-lg:[clip-path:inset(0_round_60px)]"
    >
      <div
        ref={mediaRef}
        className="w-full aspect-square overflow-hidden"
        style={{ transition: "filter 0.9s cubic-bezier(0.44, 0.06, 0.56, 0.94)" }}
      >
        <img
          src={`/projects/${slug}/image.png`}
          alt={title}
          className="w-full aspect-square object-cover"
          loading="lazy"
        />
      </div>

      {/*
        El overlay es una columna: arriba la zona del preview (crece con el
        espacio libre) y abajo el bloque de texto. Así el video nunca puede
        montarse sobre el título ni sobre los tags.
      */}
      <div
        ref={overlayRef}
        className="absolute inset-0 flex flex-col bg-gradient-to-t from-black/80 via-black/40 to-black/10"
        style={{ opacity: 1 }}
      >
        <div className="min-h-0 flex-1 p-6 pb-0 max-sm:p-4 max-sm:pb-0 max-lg:p-8 max-lg:pb-0">
          {hasVideo && (
            <div
              ref={videoWrapRef}
              className="mx-auto flex h-full w-[92%] items-center justify-center max-sm:w-full"
            >
              <video
                ref={videoRef}
                className="max-h-full w-full rounded-2xl object-cover shadow-2xl"
                style={{ aspectRatio: "16 / 9" }}
                muted
                loop
                playsInline
              />
            </div>
          )}
        </div>

        <div className="shrink-0 p-6 pt-4 pb-8 max-sm:px-5 max-sm:pt-2 max-sm:pb-4 max-lg:p-8 max-lg:pt-4 max-lg:pb-8">
          <h3 className="font-panchang-bold text-4xl text-white max-sm:text-lg max-lg:text-3xl">
            {title}
          </h3>
          {description && (
            <p className="font-clash-grotesk-regular mt-2 line-clamp-2 text-sm text-white/80 max-sm:text-[10px] max-lg:text-base">
              {description}
            </p>
          )}
          <div className="mt-4 flex items-end justify-between max-sm:mt-2 max-lg:mt-5">
            <div className="flex flex-wrap gap-3 max-sm:gap-1.5 max-lg:gap-3">
              {tags.map((tag) => {
                const iconSlug = iconSlugs[tag];
                return (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 rounded-md bg-white/15 px-2 py-1 max-sm:px-1.5 max-sm:py-0.5 max-lg:px-4 max-lg:py-2"
                  >
                    {iconSlug && (
                      <img
                        src={`https://cdn.simpleicons.org/${iconSlug}/white`}
                        alt={tag}
                        title={tag}
                        loading="lazy"
                        className="h-4 w-4 max-sm:h-2.5 max-sm:w-2.5 max-lg:h-6 max-lg:w-6"
                      />
                    )}
                    <span className="font-clash-grotesk-regular text-xs text-white/70 max-sm:text-[8px] max-lg:text-base">
                      {tag}
                    </span>
                  </span>
                );
              })}
            </div>
            <div className="flex shrink-0 items-center gap-3 pl-3">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} — GitHub`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-white/60 transition-colors hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 max-lg:h-8 max-lg:w-8"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
              )}
              {previewUrl && (
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} — ${previewUrl}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-white/60 transition-colors hover:text-white"
                >
                  <ArrowUpRight className="h-5 w-5 max-lg:h-8 max-lg:w-8" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
