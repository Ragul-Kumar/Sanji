import { cn, formatNumber } from "@/lib/cn";
import type { Accent } from "@/lib/sample-data";
import { ACCENT_TEXT } from "@/lib/sample-data";
import { Avatar } from "./bits";

export function LeaderRow({
  rank,
  initials,
  name,
  meta,
  trend,
  invited,
  accent = "violet",
  rankAccent,
  you,
  className,
}: {
  rank: number;
  initials: string;
  name: string;
  meta: string;
  trend?: string;
  invited: number;
  accent?: Accent;
  rankAccent?: Accent;
  you?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl px-4 py-4 md:gap-5 md:px-6",
        you ? "bg-lime text-ink shadow-[0_10px_40px_-6px_rgba(200,255,46,0.3)]" : "bg-surface",
        className,
      )}
    >
      <span
        className={cn(
          "w-9 shrink-0 font-mono text-[13px] font-medium md:w-14 md:text-[15px]",
          you ? "w-auto min-w-9 md:min-w-14" : rankAccent ? ACCENT_TEXT[rankAccent] : "text-muted",
        )}
      >
        {rank < 100 ? String(rank).padStart(2, "0") : formatNumber(rank)}
      </span>
      {you ? (
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-ink font-display text-[13px] font-bold text-lime">
          YOU
        </span>
      ) : (
        <Avatar initials={initials} accent={accent} />
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold md:text-[17px]">{name}</p>
        <p className={cn("truncate text-[13px] md:text-sm", you ? "text-ink/70" : "text-muted")}>{meta}</p>
      </div>
      {trend && (
        <span
          className={cn(
            "hidden rounded-full px-2.5 py-1 font-mono text-xs font-medium sm:inline-flex",
            you ? "bg-ink/10 text-ink" : "bg-surface-2 text-lime",
          )}
        >
          {trend}
        </span>
      )}
      <span className="w-12 shrink-0 text-right font-display text-xl font-bold md:w-[70px] md:text-[22px]">{formatNumber(invited)}</span>
    </div>
  );
}
