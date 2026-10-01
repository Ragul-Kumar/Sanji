import { Accent, Eyebrow, Illustrative } from "../ui/bits";
import { ButtonLink } from "../ui/Button";
import { LeaderRow } from "../ui/LeaderRow";
import { Podium } from "../leaderboard/Podium";
import { LEADERS } from "@/lib/sample-data";

export function LeaderboardPreview() {
  return (
    <section className="bg-ink py-20 md:py-[140px]" aria-labelledby="board-title">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow accent="coral">Live leaderboard</Eyebrow>
            <h2 id="board-title" className="display mt-6 text-[clamp(48px,7.5vw,96px)]">
              The line
              <br />
              is <Accent className="text-coral">public.</Accent>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <p className="max-w-[380px] text-base leading-relaxed text-muted md:text-right md:text-lg">
              No secret rankings. The board shows who brought the most artists in, and nothing else.
            </p>
            <ButtonLink href="/leaderboard" variant="outline" arrow>
              See the full board
            </ButtonLink>
          </div>
        </div>

        <Podium leaders={LEADERS.slice(0, 3)} className="mt-12 md:mt-16" />

        <div className="mt-5 grid gap-2">
          {LEADERS.slice(3, 7).map((l) => (
            <LeaderRow
              key={l.rank}
              rank={l.rank}
              initials={l.initials}
              name={l.name}
              meta={`${l.craft} · ${l.city}`}
              trend={`▲ ${l.week}`}
              invited={l.invited}
              accent={l.accent}
            />
          ))}
          <p aria-hidden className="py-2 text-center text-muted">• • •</p>
          <LeaderRow rank={1284} initials="YOU" name="You" meta="Your craft · Your city" trend="▲ 1,500" invited={3} you />
        </div>
        <Illustrative className="mt-5">Illustrative preview. The real board fills live as people join.</Illustrative>
      </div>
    </section>
  );
}
