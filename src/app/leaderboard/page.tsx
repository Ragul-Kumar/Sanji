import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { Board } from "@/components/leaderboard/Board";
import { Accent, Illustrative } from "@/components/ui/bits";
import { ButtonLink } from "@/components/ui/Button";
import { cn, formatNumber } from "@/lib/cn";
import { CITIES, LEADERS, LINE_GOALS, LINE_STATS, type Accent as AccentT } from "@/lib/sample-data";
import { FEATURES, SPOTS_PER_INVITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "The line, live",
  description: "The public Sanji leaderboard. Ranked by artists brought in, nothing else.",
};

const DOT: Record<AccentT, string> = { lime: "bg-lime", violet: "bg-violet", coral: "bg-coral", pink: "bg-pink", sky: "bg-sky" };

export default function LeaderboardPage() {
  const craftLeaders = Object.values(
    LEADERS.reduce<Record<string, (typeof LEADERS)[number]>>((acc, l) => {
      if (!acc[l.craft] || acc[l.craft].invited < l.invited) acc[l.craft] = l;
      return acc;
    }, {}),
  )
    .sort((a, b) => b.invited - a.invited)
    .slice(0, 5);
  const goal = LINE_GOALS[1];
  const pct = Math.min(1, LINE_STATS.inLine / goal.target);

  return (
    <>
      <Nav />
      <main>
        <section className="container-x flex flex-col gap-8 pt-12 pb-12 md:flex-row md:items-end md:justify-between md:pt-20">
          <div>
            <p className="eyebrow inline-flex items-center gap-2.5 text-coral">
              <span className="size-2 animate-pulse-dot rounded-full bg-coral" /> Live · updates every minute
            </p>
            <h1 className="display mt-5 text-[clamp(64px,11vw,120px)]">
              The line, <Accent className="text-coral">live.</Accent>
            </h1>
          </div>
          <dl className="flex gap-3">
            {[
              [formatNumber(LINE_STATS.inLine), "artists in line"],
              [LINE_STATS.crafts, "crafts"],
              [LINE_STATS.cities, "cities"],
            ].map(([n, k]) => (
              <div key={k} className="rounded-[20px] border border-line bg-surface px-5 py-4">
                <dt className="sr-only">{k}</dt>
                <dd className="font-display text-[28px] font-extrabold tracking-tight md:text-[34px]">{n}</dd>
                <dd className="text-[13px] text-muted">{k}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="container-x grid gap-6 pb-20 md:pb-[120px] lg:grid-cols-[1fr_400px]">
          <Board />
          <aside className="flex flex-col gap-5">
            {FEATURES.lineGoals && (
              <div className="rounded-[28px] bg-gradient-to-b from-violet to-[#2A1B6B] p-7">
                <p className="eyebrow text-lime">Line goal · everyone wins</p>
                <p className="mt-3 font-display text-[26px] leading-tight font-bold tracking-tight">
                  At {formatNumber(goal.target)} artists, {goal.title.toLowerCase()}.
                </p>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-ink/40">
                  <div className="h-full rounded-full bg-lime" style={{ width: `${pct * 100}%` }} />
                </div>
                <p className="mt-3 flex justify-between font-mono text-xs">
                  <span>
                    {formatNumber(LINE_STATS.inLine)} / {formatNumber(goal.target)}
                  </span>
                  <span className="text-lime">{Math.round(pct * 100)}%</span>
                </p>
              </div>
            )}
            <div className="card p-7">
              <p className="eyebrow text-pink">Craft leaders</p>
              <ul className="mt-5 grid gap-4">
                {craftLeaders.map((l) => (
                  <li key={l.craft} className="flex items-center gap-3">
                    <span className={cn("size-2.5 rounded-full", DOT[l.accent])} />
                    <span className="flex-1">
                      <span className="block font-semibold">{l.craft}</span>
                      <span className="block text-[13px] text-muted">{l.name}</span>
                    </span>
                    <span className="font-display text-xl font-bold">{l.invited}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-7">
              <p className="eyebrow text-sky">City chapters</p>
              <ul className="mt-5 grid gap-4">
                {CITIES.slice(0, 5).map((c) => (
                  <li key={c.city}>
                    <span className="flex justify-between text-sm">
                      <span className="font-medium">{c.city}</span>
                      <span className="font-mono text-xs text-muted">{formatNumber(c.count)}</span>
                    </span>
                    <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-surface-2">
                      <span className="block h-full rounded-full bg-sky" style={{ width: `${(c.count / CITIES[0].count) * 100}%` }} />
                    </span>
                  </li>
                ))}
              </ul>
              <Illustrative className="mt-4">Illustrative numbers.</Illustrative>
            </div>
            <div className="rounded-[28px] bg-lime p-7 text-ink">
              <p className="font-display text-[30px] leading-[1.05] font-extrabold tracking-tight">Want your name up there?</p>
              <p className="mt-2 text-[15px] text-ink/75">Every friend who joins with your link = {SPOTS_PER_INVITE} spots up.</p>
              <ButtonLink href="/you" variant="dark" arrow className="mt-5">
                Copy my link
              </ButtonLink>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
