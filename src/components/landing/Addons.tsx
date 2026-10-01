import { Accent, Eyebrow, Illustrative } from "../ui/bits";
import { ButtonLink } from "../ui/Button";
import { Countdown } from "./Countdown";
import { cn, formatNumber } from "@/lib/cn";
import { CITIES, FIRST_WORKS, LINE_GOALS, LINE_STATS } from "@/lib/sample-data";

export function CountdownBand({ date }: { date: string }) {
  return (
    <section className="bg-gradient-to-r from-lime to-sky py-16 text-ink md:py-20" aria-label="Countdown to beta">
      <div className="container-x flex flex-col items-center">
        <p className="eyebrow">The door opens in</p>
        <Countdown date={date} className="mt-6" />
      </div>
    </section>
  );
}

export function FirstWorksWall() {
  const cols = [FIRST_WORKS.slice(0, 2), FIRST_WORKS.slice(2, 4), FIRST_WORKS.slice(4, 6), FIRST_WORKS.slice(6, 8)];
  return (
    <section className="bg-ink py-20 md:py-[140px]" aria-labelledby="works-title">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow accent="pink">First works in line</Eyebrow>
            <h2 id="works-title" className="display mt-6 text-[clamp(48px,7.5vw,96px)]">
              The work is
              <br />
              <Accent className="text-pink">already here.</Accent>
            </h2>
          </div>
          <p className="max-w-[400px] text-base leading-relaxed text-muted md:text-lg">
            Artists can drop one piece when they join. It shows up here, newest first. No likes, no ranking. Just proof of who&apos;s
            coming.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-4 md:gap-4">
          {cols.map((col, i) => (
            <div key={i} className="flex flex-col gap-3 md:gap-4">
              {col.map((w) => (
                <figure
                  key={w.by}
                  className="relative flex items-end overflow-hidden rounded-3xl p-3.5 transition-transform duration-300 hover:-translate-y-1"
                  style={{ height: `clamp(${Math.round(w.h * 0.6)}px, ${w.h / 12}vw, ${w.h}px)`, background: `linear-gradient(135deg, ${w.from}, ${w.to})` }}
                >
                  <figcaption className="inline-flex items-center gap-2 rounded-full bg-ink/85 px-3 py-1.5 text-[12px] md:text-[13px]">
                    <span className="font-semibold">{w.craft}</span>
                    <span className="hidden text-muted sm:inline">{w.by}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
        <Illustrative className="mt-5">Gradient tiles stand in for real uploads.</Illustrative>
      </div>
    </section>
  );
}

export function LineGoals() {
  const tones = ["lime", "sky", "pink"] as const;
  return (
    <section className="bg-surface py-20 md:py-[140px]" aria-labelledby="goals-title">
      <div className="container-x">
        <Eyebrow>Line goals</Eyebrow>
        <h2 id="goals-title" className="display mt-6 text-[clamp(48px,7.5vw,96px)]">
          Bigger line,
          <br />
          <Accent className="text-lime">better launch.</Accent>
        </h2>
        <p className="mt-5 max-w-[560px] text-base leading-relaxed text-muted md:text-lg">
          Goals the whole line unlocks together. Your invites count for you and for everyone.
        </p>
        <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
          {LINE_GOALS.map((g, i) => {
            const pct = Math.min(1, LINE_STATS.inLine / g.target);
            const done = pct >= 1;
            return (
              <article key={g.target} className={cn("rounded-[32px] p-8 md:p-9", done ? "bg-lime text-ink" : "border border-line bg-ink")}>
                <div className="flex items-center justify-between">
                  <p className="font-display text-5xl font-extrabold tracking-tight">{formatNumber(g.target)}</p>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 font-mono text-[11px] font-medium tracking-wider",
                      done ? "bg-ink text-lime" : tones[i] === "sky" ? "bg-sky/15 text-sky" : "bg-pink/15 text-pink",
                    )}
                  >
                    {done ? "✓ UNLOCKED" : `${Math.round(pct * 100)}%`}
                  </span>
                </div>
                <p className={cn("mt-2 eyebrow", done ? "text-ink/60" : "text-muted")}>Artists in line</p>
                <div className={cn("mt-4 h-2.5 overflow-hidden rounded-full", done ? "bg-ink/20" : "bg-surface-2")}>
                  <div
                    className={cn("h-full rounded-full", done ? "bg-ink" : tones[i] === "sky" ? "bg-sky" : "bg-pink")}
                    style={{ width: `${Math.max(6, pct * 100)}%` }}
                  />
                </div>
                <h3 className="mt-7 font-display text-[28px] leading-tight font-bold tracking-tight">{g.title}</h3>
                <p className={cn("mt-2 text-base leading-relaxed", done ? "text-ink/70" : "text-muted")}>{g.body}</p>
              </article>
            );
          })}
        </div>
        <Illustrative className="mt-5" />
      </div>
    </section>
  );
}

export function CityChapters() {
  const tones = ["text-lime", "text-sky", "text-pink", "text-coral", "text-violet"];
  return (
    <section className="bg-ink py-20 md:py-[140px]" aria-labelledby="cities-title">
      <div className="container-x grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-20">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow accent="sky">City chapters</Eyebrow>
          <h2 id="cities-title" className="display text-[clamp(48px,7vw,88px)]">
            Put your city
            <br />
            <Accent className="text-sky">on the map.</Accent>
          </h2>
          <p className="max-w-[480px] text-base leading-relaxed text-muted md:text-lg">
            Pick your city when you join. The top cities get local launch events and open first.
          </p>
          <ButtonLink href="/#join" arrow>
            Rep my city
          </ButtonLink>
        </div>
        <div>
          <ol className="grid grid-cols-2 gap-2.5">
            {CITIES.map((c, i) => (
              <li key={c.city} className="card flex items-center justify-between rounded-3xl px-5 py-5 md:px-6">
                <span className="flex items-center gap-3">
                  <span className={cn("font-mono text-[13px] font-medium", tones[i % 5])}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-lg font-bold tracking-tight md:text-2xl">{c.city}</span>
                </span>
                <span className="font-mono text-xs text-muted md:text-sm">{formatNumber(c.count)}</span>
              </li>
            ))}
          </ol>
          <Illustrative className="mt-4">Illustrative numbers.</Illustrative>
        </div>
      </div>
    </section>
  );
}
