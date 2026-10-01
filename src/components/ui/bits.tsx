import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ACCENT_BG, ACCENT_TEXT, type Accent } from "@/lib/sample-data";

/** Mono label with a coloured dot, used above every section heading. */
export function Eyebrow({ children, accent = "lime", className }: { children: ReactNode; accent?: Accent | "ink"; className?: string }) {
  return (
    <p className={cn("eyebrow inline-flex items-center gap-2.5", accent === "ink" ? "text-ink" : ACCENT_TEXT[accent], className)}>
      <span aria-hidden className={cn("size-2 rounded-full", accent === "ink" ? "bg-ink" : ACCENT_BG[accent])} />
      {children}
    </p>
  );
}

/** Serif italic accent word inside a .display heading. */
export function Accent({ children, className }: { children: ReactNode; className?: string }) {
  return <em className={cn("accent", className)}>{children}</em>;
}

export function Glow({ className, style }: { className?: string; style?: CSSProperties }) {
  return <div aria-hidden className={cn("glow", className)} style={style} />;
}

export function Sticker({
  children,
  className,
  tone = "pink",
}: {
  children: ReactNode;
  className?: string;
  tone?: "pink" | "coral" | "sky" | "violet" | "lime" | "ink";
}) {
  const tones = {
    pink: "bg-pink text-ink",
    coral: "bg-coral text-paper",
    sky: "bg-sky text-ink",
    violet: "bg-violet text-paper",
    lime: "bg-lime text-ink",
    ink: "bg-ink text-lime",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-4 py-2 font-display text-[15px] font-bold tracking-tight whitespace-nowrap shadow-[0_12px_24px_rgba(0,0,0,0.4)] md:px-[18px] md:py-[11px] md:text-lg",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Avatar({
  initials,
  accent = "violet",
  size = 44,
  className,
}: {
  initials: string;
  accent?: Accent;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full font-display font-bold text-ink", ACCENT_BG[accent], className)}
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {initials}
    </span>
  );
}

export function Chip({ children, active, className }: { children: ReactNode; active?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors",
        active ? "border-paper bg-paper text-ink" : "border-line bg-surface text-paper hover:border-paper/30",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Illustrative({ children = "Illustrative preview. Live data replaces this at launch.", className }: { children?: ReactNode; className?: string }) {
  return <p className={cn("font-mono text-xs tracking-wide text-muted", className)}>{children}</p>;
}
