import { cn } from "@/lib/cn";
import type { Badge } from "@/lib/site";
import { ACCENT_TEXT } from "@/lib/sample-data";

/** Circular Founding Badge: gradient rim, dashed ring, ink disc. */
export function BadgeSeal({ badge, size = 220, className }: { badge: Badge; size?: number; className?: string }) {
  const s = size / 220;
  return (
    <div
      role="img"
      aria-label={`${badge.name} badge`}
      className={cn("relative shrink-0 rounded-full", className)}
      style={{ width: size, height: size, background: badge.rim }}
    >
      <span aria-hidden className="absolute rounded-full border-2 border-dotted border-ink/45" style={{ inset: 14 * s }} />
      <span aria-hidden className="absolute flex flex-col items-center justify-center gap-[2px] rounded-full bg-ink text-center" style={{ inset: 32 * s }}>
        <span className="font-mono font-medium tracking-[0.14em] text-muted" style={{ fontSize: Math.max(8, 10.5 * s) }}>
          ✺ 2026 ✺
        </span>
        <span
          className={cn("font-display leading-none font-extrabold tracking-[-0.06em]", ACCENT_TEXT[badge.accent])}
          style={{ fontSize: 62 * s }}
        >
          {badge.mark}
        </span>
        <span className="font-mono font-medium tracking-[0.12em] text-paper uppercase" style={{ fontSize: Math.max(7, 10.5 * s) }}>
          {badge.name}
        </span>
      </span>
    </div>
  );
}
