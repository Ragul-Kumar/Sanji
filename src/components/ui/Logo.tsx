import Link from "next/link";
import { cn } from "@/lib/cn";

type Tone = "lime" | "dark" | "light";

const TONES: Record<Tone, { bg: string; fg: string }> = {
  lime: { bg: "var(--color-lime)", fg: "var(--color-ink)" },
  dark: { bg: "var(--color-ink)", fg: "var(--color-lime)" },
  light: { bg: "var(--color-paper)", fg: "var(--color-ink)" },
};

/** The ticket mark: a notched admission ticket carrying "s." */
export function Mark({ size = 40, tone = "lime", className }: { size?: number; tone?: Tone; className?: string }) {
  const t = TONES[tone];
  const r = size * 0.085;
  const mask = `radial-gradient(circle at 0 50%, transparent ${r}px, #000 ${r + 0.5}px), radial-gradient(circle at 100% 50%, transparent ${r}px, #000 ${r + 0.5}px)`;
  return (
    <span
      aria-hidden
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.24,
        background: t.bg,
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
      }}
    >
      <span className="inline-flex items-end" style={{ transform: `translate(-${size * 0.02}px, -${size * 0.045}px)` }}>
        <span
          className="font-display font-extrabold"
          style={{ fontSize: size * 0.8, lineHeight: 0.78, letterSpacing: "-0.04em", color: t.fg }}
        >
          s
        </span>
        <span
          className="rounded-full"
          style={{ width: size * 0.13, height: size * 0.13, background: t.fg, marginLeft: size * 0.03, marginBottom: size * 0.005 }}
        />
      </span>
    </span>
  );
}

/** "sanji." wordmark, optionally with the mark. */
export function Wordmark({
  size = 30,
  withMark = false,
  dot = "lime",
  className,
  href = "/",
}: {
  size?: number;
  withMark?: boolean;
  dot?: "lime" | "ink";
  className?: string;
  href?: string | null;
}) {
  const inner = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {withMark && <Mark size={size * 1.15} />}
      <span className="inline-flex items-end gap-[0.12em]">
        <span className="font-display font-extrabold leading-[0.8]" style={{ fontSize: size, letterSpacing: "-0.05em" }}>
          sanji
        </span>
        <span
          className={cn("rounded-full", dot === "lime" ? "bg-lime" : "bg-ink")}
          style={{ width: size * 0.28, height: size * 0.28, marginBottom: size * 0.02 }}
        />
      </span>
    </span>
  );
  if (!href) return inner;
  return (
    <Link href={href} aria-label="Sanji home" className="rounded-lg">
      {inner}
    </Link>
  );
}
