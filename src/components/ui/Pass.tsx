import { cn } from "@/lib/cn";

export type PassTone = "lime" | "pink-sky" | "coral";

const TONE: Record<PassTone, string> = {
  lime: "bg-lime",
  "pink-sky": "bg-gradient-to-br from-pink to-sky",
  coral: "bg-gradient-to-br from-coral to-[#FFB36B]",
};

/** Collectible reward pass. */
export function Pass({
  no,
  requirement,
  title,
  body,
  tone,
  locked,
  className,
}: {
  no: string;
  requirement: string;
  title: string;
  body?: string;
  tone: PassTone;
  locked?: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "relative flex aspect-[376/520] w-full max-w-[376px] flex-col overflow-hidden rounded-[28px] p-7 text-ink md:p-8",
        TONE[tone],
        locked && "opacity-40 saturate-50",
        className,
      )}
    >
      <div className="flex justify-between font-mono text-[13px] font-medium tracking-[0.08em] uppercase">
        <span>{requirement}</span>
        <span className="opacity-60">{no}</span>
      </div>
      <div className="flex-1" />
      <h3 className="font-display text-[clamp(44px,4.2vw,62px)] leading-[0.9] font-extrabold tracking-[-0.05em] whitespace-nowrap">
        {(title.startsWith("@") ? ["@your", "name"] : title.split(" ")).map((w, i) => (
          <span key={i} className="block">
            {w}
          </span>
        ))}
      </h3>
      {body && (
        <>
          <div className="my-5 border-t-[1.5px] border-dashed border-ink/30" />
          <p className="text-base leading-relaxed opacity-80">{body}</p>
        </>
      )}
    </article>
  );
}
