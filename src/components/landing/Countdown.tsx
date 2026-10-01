"use client";

import { Fragment, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

function parts(target: number) {
  const ms = Math.max(0, target - Date.now());
  return [
    [Math.floor(ms / 86_400_000), "days"],
    [Math.floor(ms / 3_600_000) % 24, "hours"],
    [Math.floor(ms / 60_000) % 60, "min"],
    [Math.floor(ms / 1000) % 60, "sec"],
  ] as const;
}

export function Countdown({ date, className }: { date: string; className?: string }) {
  const target = new Date(date).getTime();
  const [now, setNow] = useState<ReturnType<typeof parts> | null>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(parts(target)), 1000);
    return () => clearInterval(t);
  }, [target]);

  const shown = now ?? parts(target);
  return (
    <div className={cn("flex items-center gap-2 md:gap-4", className)} role="timer" aria-live="off">
      {shown.map(([n, label], i) => (
        <Fragment key={label}>
          <div className="flex flex-col items-center rounded-2xl bg-ink px-3 pt-4 pb-3 md:rounded-[28px] md:px-9 md:pt-6 md:pb-5">
            <span
              className={cn(
                "font-display text-[44px] leading-[0.95] font-extrabold tracking-[-0.05em] tabular-nums md:text-[120px]",
                i === 3 ? "text-lime" : "text-paper",
              )}
              suppressHydrationWarning
            >
              {String(n).padStart(2, "0")}
            </span>
            <span className="mt-1 eyebrow text-[10px] text-muted md:text-xs">{label}</span>
          </div>
          {i < 3 && <span className="font-display text-3xl font-extrabold md:text-[80px]">:</span>}
        </Fragment>
      ))}
    </div>
  );
}
