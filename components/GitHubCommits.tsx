"use client";

import { useEffect, useState, useMemo } from "react";
import { ActivityCalendar } from "react-activity-calendar";

const styles = `
.gh-scroll > div {
  overflow-x: hidden !important;
  scrollbar-width: none;
}
.gh-scroll > div::-webkit-scrollbar {
  display: none;
}
`;

interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

type Status = "loading" | "ready" | "unavailable";

const levelFromCount = (count: number): 0 | 1 | 2 | 3 | 4 => {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
};

function Skeleton() {
  return (
    <div className="flex gap-1 h-28 items-end">
      {Array.from({ length: 52 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-1">
          {Array.from({ length: 7 }).map((_, j) => (
            <div
              key={j}
              className="size-3 rounded-sm bg-neutral-200 dark:bg-neutral-800 animate-pulse"
              style={{ opacity: 1 - j * 0.1 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function GitHubCommits({ username = "juanm4ram" }: { username?: string }) {
  const [data, setData] = useState<Activity[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [isDark, setIsDark] = useState(false);

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
        setData(
          contributions.map((c) => ({
            date: c.date,
            count: c.count,
            level: levelFromCount(c.count),
          })),
        );
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("unavailable");
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  const displayData = useMemo(() => {
    if (typeof window === "undefined" || data.length === 0) return data;
    const isMobile = window.innerWidth < 640;
    if (!isMobile) return data;
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const recent = data.filter((d) => new Date(d.date) >= sixMonthsAgo);
    return recent.length > 0 ? recent : data;
  }, [data]);

  return (
    <>
      <style>{styles}</style>
      <div className="w-full">
        {status === "loading" && <Skeleton />}

        {status === "unavailable" && (
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-clash-grotesk-regular flex h-28 items-center text-sm text-neutral-500 underline-offset-4 hover:underline"
          >
            Mirá mi actividad en github.com/{username}
          </a>
        )}

        {status === "ready" && displayData.length > 0 && (
          <ActivityCalendar
            className="gh-scroll"
            data={displayData}
            blockSize={10}
            blockMargin={3}
            fontSize={11}
            colorScheme={isDark ? "dark" : "light"}
            theme={{
              light: ["#e5e5e5", "#b3b3b3", "#737373", "#333333", "#000000"],
              dark: ["#111111", "#666666", "#b3b3b3", "#e6e6e6", "#ffffff"],
            }}
            showMonthLabels={false}
            showColorLegend={false}
            showTotalCount={false}
          />
        )}
      </div>
    </>
  );
}
