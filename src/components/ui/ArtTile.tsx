import { cn } from "@/lib/cn";

type Kind = "painting" | "photography" | "music" | "film";

const LABEL: Record<Kind, string> = {
  painting: "Painting",
  photography: "Photography",
  music: "Music",
  film: "Film & Dance",
};

/** Abstract art card standing in for a craft. Pure CSS, no images. */
export function ArtTile({ kind, label, className }: { kind: Kind; label?: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative h-[300px] w-[230px] overflow-hidden rounded-[28px] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.55)]",
        kind === "painting" && "bg-gradient-to-br from-coral to-pink",
        kind === "photography" && "bg-gradient-to-br from-sky to-violet",
        kind === "music" && "bg-gradient-to-b from-violet to-surface-2",
        kind === "film" && "bg-gradient-to-br from-pink to-coral",
        className,
      )}
    >
      {kind === "painting" && (
        <>
          <span className="absolute -top-5 -left-8 size-[180px] rounded-full bg-gold" />
          <span className="absolute top-[120px] left-[60px] h-[140px] w-[220px] rotate-[20deg] rounded-[50%] bg-violet" />
          <span className="absolute -top-2 left-[150px] h-[200px] w-3.5 -rotate-[25deg] bg-ink" />
        </>
      )}
      {kind === "photography" && (
        <div className="absolute inset-x-0 top-[20px] flex justify-center">
          <div className="relative size-[200px]">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="absolute rounded-full border-2 border-ink"
                style={{ inset: i * 19, opacity: 0.35 + i * 0.1 }}
              />
            ))}
            <span className="absolute inset-[82px] rounded-full bg-ink" />
          </div>
        </div>
      )}
      {kind === "music" && (
        <div className="absolute inset-x-5 top-[50px] flex h-[160px] items-center justify-between">
          {[60, 120, 90, 170, 130, 200, 110, 150, 70, 120, 40].map((h, i) => (
            <span key={i} className="w-2.5 rounded-full bg-lime" style={{ height: Math.min(h, 160) }} />
          ))}
        </div>
      )}
      {kind === "film" && (
        <div className="absolute -top-2 left-[55px] flex h-[330px] w-[120px] flex-col gap-3 bg-ink px-2 py-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <span className="h-3.5 w-2 rounded-sm bg-pink" />
              <span className="h-[30px] flex-1 rounded bg-coral" style={{ opacity: 0.5 + (i % 3) * 0.2 }} />
              <span className="h-3.5 w-2 rounded-sm bg-pink" />
            </div>
          ))}
        </div>
      )}
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-[13px] font-medium text-paper">
        <span className="size-1.5 rounded-full bg-lime" />
        {label ?? LABEL[kind]}
      </span>
    </div>
  );
}
