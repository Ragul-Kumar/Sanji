import { cn, formatNumber } from "@/lib/cn";
import { BADGES, PASSES, SPOTS_PER_INVITE, badgeFor } from "@/lib/site";
import { BadgeSeal } from "../ui/BadgeSeal";
import { LeaderRow } from "../ui/LeaderRow";
import { NEIGHBOURS } from "@/lib/sample-data";
import { Accent, Eyebrow, Illustrative } from "../ui/bits";

const MINI: Record<string, string> = {
  lime: "bg-lime",
  "pink-sky": "bg-gradient-to-br from-pink to-sky",
  coral: "bg-gradient-to-br from-coral to-[#FFB36B]",
};

export function passStatus(invites: number, position: number) {
  return PASSES.map((p) => {
    const unlocked = p.need != null ? invites >= p.need : position <= 100;
    const togo = p.need != null ? Math.max(0, p.need - invites) : null;
    return { ...p, unlocked, togo };
  });
}

export function PassLadder({ invites, pending, position, className }: { invites: number; pending: number; position: number; className?: string }) {
  const list = passStatus(invites, position);
  const nextId = list.find((p) => !p.unlocked)?.id;
  return (
    <section className={cn("rounded-[32px] border border-line bg-surface p-6 md:p-10", className)} aria-labelledby="passes-title">
      <div className="flex items-center justify-between">
        <h2 id="passes-title" className="eyebrow text-lime">
          Your passes
        </h2>
        <p className="font-mono text-xs text-muted">
          {invites} confirmed{pending ? ` · ${pending} pending` : ""}
        </p>
      </div>
      <ul className="mt-5 grid gap-2.5">
        {list.map((p) => {
          const isNext = p.id === nextId;
          return (
            <li
              key={p.id}
              className={cn("flex items-center gap-4 rounded-[20px] p-3.5 pr-4", p.unlocked || isNext ? "bg-surface-2" : "bg-ink")}
            >
              <span aria-hidden className={cn("h-[72px] w-14 shrink-0 rounded-xl", MINI[p.tone], !p.unlocked && !isNext && "opacity-35")} />
              <div className="min-w-0 flex-1">
                <p className={cn("font-display text-xl font-bold tracking-tight md:text-[22px]", !p.unlocked && !isNext && "text-paper/70")}>
                  {p.title}
                </p>
                <p className="font-mono text-xs text-muted">{p.requirement}</p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 font-mono text-[11px] font-medium",
                  p.unlocked ? "bg-lime text-ink" : isNext ? "bg-lime/15 text-lime" : "border border-line text-muted",
                )}
              >
                {p.unlocked ? "✓ Unlocked" : p.togo != null ? `${p.togo} to go` : "🔒 #100"}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function BadgeStatus({ position }: { position: number }) {
  const current = badgeFor(position);
  const i = BADGES.findIndex((b) => b.id === current.id);
  const next = i > 0 ? BADGES[i - 1] : null;
  const invitesNeeded = next ? Math.ceil((position - next.maxRank) / SPOTS_PER_INVITE) : 0;
  return (
    <section
      className="relative flex flex-col items-center gap-6 overflow-hidden rounded-[32px] border border-line bg-surface p-6 text-center md:flex-row md:gap-10 md:p-10 md:text-left"
      aria-labelledby="badge-title"
    >
      <span aria-hidden className="glow -top-20 -left-20 size-[320px] bg-gold/15" />
      <BadgeSeal badge={current} size={150} className="relative" />
      <div className="relative flex-1">
        <p className="eyebrow text-gold">Your founding badge · today</p>
        <h2 id="badge-title" className="mt-2 font-display text-[32px] leading-tight font-bold tracking-tight md:text-[40px]">
          {current.name}
        </h2>
        <p className="mt-2 max-w-[520px] text-base leading-relaxed text-muted">
          {next
            ? `Bring ${invitesNeeded} friend${invitesNeeded > 1 ? "s" : ""} to reach ${next.name} (${next.req.toLowerCase()}). Your badge locks at your final spot when the beta opens.`
            : "You hold the rarest badge there is. Hold your spot until the beta opens and it's yours forever."}
        </p>
      </div>
      {next && (
        <div className="relative flex items-center gap-3 rounded-full border border-line bg-ink py-2 pr-5 pl-2 opacity-80">
          <BadgeSeal badge={next} size={52} />
          <span className="text-left">
            <span className="block font-mono text-[10px] tracking-[0.12em] text-muted uppercase">Next</span>
            <span className="block font-semibold">{next.name}</span>
          </span>
        </div>
      )}
    </section>
  );
}

export function ClimbCalc({ position }: { position: number }) {
  const rows = [
    { n: 1, label: "First Wave pass" },
    { n: 3, label: "Big jump" },
    { n: 5, label: "@handle reserved" },
  ];
  return (
    <section
      className="flex flex-col gap-6 rounded-[32px] bg-gradient-to-br from-violet to-[#2A1B6B] p-6 md:flex-row md:items-center md:gap-0 md:p-10"
      aria-labelledby="climb-title"
    >
      <div className="md:flex-1">
        <p className="eyebrow text-lime">Your climb</p>
        <h2 id="climb-title" className="mt-2 font-display text-[28px] leading-tight font-bold tracking-tight md:text-[30px]">
          What your
          <br className="hidden md:block" /> friends are worth
        </h2>
      </div>
      {rows.map((r, i) => (
        <div key={r.n} className="flex items-center justify-between border-paper/20 md:flex-1 md:flex-col md:items-start md:border-l md:pl-8">
          <div className="md:order-2">
            <p className="font-mono text-xs tracking-wider text-paper/65 uppercase md:hidden">
              {r.n} friend{r.n > 1 ? "s" : ""}
            </p>
            <p className="text-sm font-medium text-paper/75">{r.label}</p>
          </div>
          <div className="md:order-1">
            <p className="hidden font-mono text-xs tracking-wider text-paper/65 uppercase md:block">
              {r.n} friend{r.n > 1 ? "s" : ""}
            </p>
            <p className={cn("font-display text-[40px] leading-none font-extrabold tracking-[-0.05em] md:text-6xl", i === 2 ? "text-lime" : "")}>
              #{formatNumber(Math.max(1, position - r.n * SPOTS_PER_INVITE))}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export function Nearby({ position, craft }: { position: number; craft: string }) {
  const ahead = Math.max(0, position - 1);
  const rows = [
    { pos: position - 2, n: NEIGHBOURS[0] },
    { pos: position - 1, n: NEIGHBOURS[1] },
    { pos: position, n: null },
    { pos: position + 1, n: NEIGHBOURS[2] },
  ].filter((r) => r.pos >= 1);
  return (
    <section className="bg-surface py-20 md:py-[120px]" aria-labelledby="near-title">
      <div className="container-x flex flex-col items-center text-center">
        <Eyebrow accent="coral">Around you</Eyebrow>
        <h2 id="near-title" className="display mt-5 text-[clamp(42px,6vw,72px)]">
          {formatNumber(ahead)} {ahead === 1 ? "person" : "people"} ahead.
          <br />
          <Accent className="text-coral">One invite passes {SPOTS_PER_INVITE}.</Accent>
        </h2>
        <div className="mt-12 grid w-full max-w-[760px] gap-2 text-left">
          {rows.map((r) =>
            r.n ? (
              <LeaderRow
                key={r.pos}
                rank={r.pos}
                initials={r.n.initials}
                name={r.n.name}
                meta={`${r.n.craft} · ${r.n.city}`}
                trend="new"
                invited={0}
                accent={r.n.accent}
                className="bg-ink"
              />
            ) : (
              <LeaderRow key="you" rank={r.pos} initials="YOU" name="You" meta={craft} invited={0} you />
            ),
          )}
        </div>
        <Illustrative className="mt-5">Illustrative. Your real neighbours show up here once the backend is live.</Illustrative>
      </div>
    </section>
  );
}
