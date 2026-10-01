"use client";

import { useMemo, useState } from "react";
import { Illustrative } from "../ui/bits";
import { LeaderRow } from "../ui/LeaderRow";
import { useMe } from "../you/useMe";
import { cn } from "@/lib/cn";
import { LEADERS, type Accent } from "@/lib/sample-data";

const TABS = ["Top inviters", "By craft", "By city", "This week"] as const;
const CRAFT_FILTERS = ["All crafts", "Painting", "Dance", "Photography", "Music", "Film", "Poetry", "Sculpture", "Design"];
const RANK_ACCENT: Accent[] = ["lime", "sky", "pink"];

export function Board() {
  const me = useMe();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Top inviters");
  const [craft, setCraft] = useState("All crafts");
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(10);

  const rows = useMemo(() => {
    let list = [...LEADERS];
    if (craft !== "All crafts") list = list.filter((l) => l.craft === craft);
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      list = list.filter((l) => `${l.name} ${l.city} ${l.craft}`.toLowerCase().includes(s));
    }
    if (tab === "This week") list.sort((a, b) => b.week - a.week);
    if (tab === "By city") list.sort((a, b) => a.city.localeCompare(b.city) || b.invited - a.invited);
    if (tab === "By craft") list.sort((a, b) => a.craft.localeCompare(b.craft) || b.invited - a.invited);
    return list;
  }, [tab, craft, q]);

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="Leaderboard view" className="no-scrollbar flex gap-1 overflow-x-auto rounded-full bg-surface p-1">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                "shrink-0 rounded-full px-[18px] py-2.5 text-sm font-semibold transition-colors",
                tab === t ? "bg-lime text-ink" : "text-muted hover:text-paper",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <label className="flex h-12 items-center gap-2.5 rounded-full border border-line bg-surface px-5 md:w-[280px]">
          <span aria-hidden className="text-muted">
            ⌕
          </span>
          <span className="sr-only">Search the leaderboard</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Find a name or city"
            className="w-full bg-transparent text-sm placeholder:text-muted focus:outline-none"
          />
        </label>
      </div>

      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
        {CRAFT_FILTERS.map((c) => (
          <button
            key={c}
            onClick={() => setCraft(c)}
            aria-pressed={craft === c}
            className={cn(
              "inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors",
              craft === c ? "border-paper bg-paper text-ink" : "border-line bg-surface hover:border-paper/30",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-2 hidden gap-5 px-6 font-mono text-[11px] tracking-[0.12em] text-muted uppercase md:flex">
        <span className="w-14">Rank</span>
        <span className="flex-1 pl-16">Artist</span>
        <span>This week</span>
        <span className="w-[70px] text-right">Invited</span>
      </div>

      <ol className="grid gap-2">
        {rows.slice(0, shown).map((l) => (
          <li key={l.rank}>
            <LeaderRow
              rank={l.rank}
              initials={l.initials}
              name={l.name}
              meta={`${l.craft} · ${l.city}`}
              trend={`▲ ${l.week}`}
              invited={l.invited}
              accent={l.accent}
              rankAccent={l.rank <= 3 ? RANK_ACCENT[l.rank - 1] : undefined}
            />
          </li>
        ))}
        {rows.length === 0 && (
          <li className="rounded-2xl border border-dashed border-line px-6 py-10 text-center text-muted">Nobody matches that yet.</li>
        )}
      </ol>

      {rows.length > shown && (
        <button onClick={() => setShown((s) => s + 50)} className="py-3 text-[15px] font-semibold text-muted hover:text-paper">
          Show more ↓
        </button>
      )}

      {me && (
        <div className="sticky bottom-4 z-10 mt-2">
          <LeaderRow
            rank={me.position}
            initials="YOU"
            name="You · pinned"
            meta={me.email}
            trend={me.invites ? `▲ ${me.startPosition - me.position}` : undefined}
            invited={me.invites}
            you
          />
        </div>
      )}
      <Illustrative>Illustrative numbers. Live data replaces them at launch.</Illustrative>
    </div>
  );
}
