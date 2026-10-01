import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "lime" | "coral" | "dashed";

/** The admission ticket — the hero object of the brand. */
export function Ticket({
  label = "Sanji · Your number",
  number,
  sub,
  trend,
  footer,
  tone = "lime",
  notches = true,
  className,
}: {
  label?: string;
  number: string;
  sub?: ReactNode;
  trend?: string;
  footer?: ReactNode;
  tone?: Tone;
  notches?: boolean;
  className?: string;
}) {
  const fg = tone === "dashed" ? "text-lime" : "text-ink";
  return (
    <div
      className={cn(
        "relative flex aspect-[32/38] w-[300px] flex-col justify-between overflow-hidden rounded-[32px] p-7",
        tone === "lime" && "bg-lime shadow-[0_30px_90px_-20px_rgba(200,255,46,0.45)]",
        tone === "coral" && "bg-gradient-to-br from-coral to-pink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]",
        tone === "dashed" && "border-2 border-dashed border-lime bg-ink",
        className,
      )}
    >
      <div className={cn("flex justify-between font-mono text-[11px] font-medium tracking-[0.12em] uppercase", fg)}>
        <span>{label}</span>
        <span className="opacity-55">2026</span>
      </div>
      <div className={fg}>
        <p className="font-display text-[clamp(48px,5.6vw,80px)] leading-none font-extrabold tracking-[-0.06em] whitespace-nowrap">{number}</p>
        {sub && <div className={cn("mt-2 text-[15px] font-medium", tone === "dashed" ? "text-muted" : "opacity-80")}>{sub}</div>}
        {trend && (
          <span
            className={cn(
              "mt-4 inline-flex rounded-full px-3 py-1.5 font-mono text-[13px] font-medium",
              tone === "dashed" ? "bg-lime text-ink" : "bg-ink text-lime",
            )}
          >
            {trend}
          </span>
        )}
      </div>
      {footer && (
        <div className={cn("border-t-[1.5px] border-dashed pt-4", tone === "dashed" ? "border-lime/30" : "border-ink/30", fg)}>{footer}</div>
      )}
      {notches && tone !== "dashed" && (
        <>
          <span aria-hidden className="absolute top-[66%] -left-4 size-8 rounded-full bg-ink" />
          <span aria-hidden className="absolute top-[66%] -right-4 size-8 rounded-full bg-ink" />
        </>
      )}
    </div>
  );
}
