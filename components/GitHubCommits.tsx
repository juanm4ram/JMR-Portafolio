"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { useLang } from "@/lib/i18n";

interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

type Status = "loading" | "ready" | "unavailable";

const BLOCK_MARGIN = 3;
const MIN_BLOCK = 6;
const MAX_BLOCK = 12;

const levelFromCount = (count: number, max: number): 0 | 1 | 2 | 3 | 4 => {
  if (count <= 0) return 0;
  if (max <= 1) return 4;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
};

function Skeleton({ blockSize }: { blockSize: number }) {
  return (
    <div className="flex h-28 items-end" style={{ gap: BLOCK_MARGIN }}>
      {Array.from({ length: 52 }).map((_, i) => (
        <div key={i} className="flex flex-col" style={{ gap: BLOCK_MARGIN }}>
          {Array.from({ length: 7 }).map((_, j) => (
            <div
              key={j}
              className="rounded-sm bg-neutral-200 dark:bg-neutral-800 animate-pulse"
              style={{
                width: blockSize,
                height: blockSize,
                opacity: 1 - j * 0.1,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function GitHubCommits({ username = "juanm4ram" }: { username?: string }) {
  const [data, setData] = useState<Activity[]>([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<Status>("loading");
  const [isDark, setIsDark] = useState(false);
  const [blockSize, setBlockSize] = useState(10);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  /* tema ------------------------------------------------------------ */
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark")),
    );
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  /* el calendario se ajusta al ancho disponible ---------------------- */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const weeks = 53;
    const fit = (width: number) => {
      if (width <= 0) return;
      const size = Math.floor(width / weeks) - BLOCK_MARGIN;
      setBlockSize(Math.max(MIN_BLOCK, Math.min(MAX_BLOCK, size)));
    };

    fit(el.clientWidth);
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) fit(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* datos ------------------------------------------------------------ */
  useEffect(() => {
    let cancelled = false;

    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: { contributions?: { date: string; count: number }[] }) => {
        if (cancelled) return;
        const contributions = json.contributions ?? [];
        if (contributions.length === 0) {
          setStatus("unavailable");
          return;
        }
        const max = contributions.reduce((m, c) => Math.max(m, c.count), 0);
        setData(
          contributions.map((c) => ({
            date: c.date,
            count: c.count,
            level: levelFromCount(c.count, max),
          })),
        );
        setTotal(contributions.reduce((sum, c) => sum + c.count, 0));
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("unavailable");
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  /* en pantallas chicas mostramos sólo los últimos 6 meses ----------- */
  const displayData = useMemo(() => {
    if (typeof window === "undefined" || data.length === 0) return data;
    if (window.innerWidth >= 640) return data;
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const recent = data.filter((d) => new Date(d.date) >= sixMonthsAgo);
    return recent.length > 0 ? recent : data;
  }, [data]);

  return (
    <div ref={wrapRef} className="w-full min-w-0">
      {status === "loading" && <Skeleton blockSize={blockSize} />}

      {status === "unavailable" && (
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-clash-grotesk-regular flex h-28 items-center text-sm text-neutral-500 underline-offset-4 hover:underline"
        >
          {t("hero.githubFallback", { user: username })}
        </a>
      )}

      {status === "ready" && displayData.length > 0 && (
        <div className="flex flex-col gap-2">
          <ActivityCalendar
            data={displayData}
            blockSize={blockSize}
            blockMargin={BLOCK_MARGIN}
            blockRadius={2}
            fontSize={11}
            colorScheme={isDark ? "dark" : "light"}
            theme={{
              light: ["#e5e5e5", "#b3b3b3", "#737373", "#333333", "#000000"],
              dark: ["#1c1c1c", "#666666", "#b3b3b3", "#e6e6e6", "#ffffff"],
            }}
            showMonthLabels={false}
            showColorLegend={false}
            showTotalCount={false}
            showWeekdayLabels={false}
          />
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-clash-grotesk-regular text-xs text-neutral-500 underline-offset-4 hover:underline"
          >
            {t("hero.githubCount", { count: total.toLocaleString() })}
          </a>
        </div>
      )}
    </div>
  );
}
