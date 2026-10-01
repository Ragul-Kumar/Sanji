import { BadgeSeal } from "../ui/BadgeSeal";
import { Glow } from "../ui/bits";
import { ButtonLink } from "../ui/Button";
import { cn } from "@/lib/cn";
import { ACCENT_TEXT } from "@/lib/sample-data";
import { BADGES } from "@/lib/site";

// Show the common badge first and build up to the rarest.
const ORDER = [...BADGES].reverse();

export function FoundingBadges() {
  return (
    <section id="badges" className="relative scroll-mt-24 overflow-hidden bg-ink py-20 md:py-[150px]" aria-labelledby="badges-title">
      <Glow className="top-10 -left-60 size-[640px] bg-gold/15" />
      <Glow className="top-[420px] -right-40 size-[700px] bg-violet/30" />

      <div className="relative container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-20">
          <div>
            <p className="eyebrow inline-flex items-center gap-2.5 text-gold">
              <span aria-hidden className="size-2 rounded-full bg-gold" />
              Founding badges · Preregistration only
            </p>
            <h2 id="badges-title" className="display mt-6 text-[clamp(44px,7.5vw,96px)]">
              Earned before launch.
              <br />
              <em className="accent text-gold">Never again.</em>
            </h2>
          </div>
          <p className="max-w-[420px] text-base leading-relaxed text-muted md:text-[19px]">
            This is how we honour the people who believed first. Badges are set by your final spot on the board, sit on your
            profile forever, and can&apos;t be bought. When the beta opens, the set closes for good.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-2 gap-2.5 md:mt-[72px] md:grid-cols-4 md:items-end md:gap-5">
          {ORDER.map((b) => {
            const hero = b.id === "founding-ten";
            return (
              <li
                key={b.id}
                className={cn(
                  "flex flex-col items-center rounded-3xl px-3 pt-5 pb-5 text-center md:rounded-[32px] md:px-7 md:pb-9",
                  hero
                    ? "border-[1.5px] border-lime bg-gradient-to-b from-surface-2 to-ink shadow-[0_0_80px_rgba(200,255,46,0.2)] md:pt-11"
                    : "border border-line bg-surface md:pt-9",
                )}
              >
                <BadgeSeal badge={b} size={hero ? 220 : 180} className={cn("hidden md:block", hero && "transition-transform duration-500 hover:rotate-12")} />
                <BadgeSeal badge={b} size={128} className="md:hidden" />
                {hero && (
                  <span className="mt-4 rounded-full bg-lime px-3 py-1 font-mono text-[10px] font-medium tracking-[0.14em] text-ink md:mt-6 md:text-[11px]">
                    RAREST
                  </span>
                )}
                <h3 className={cn("font-display text-lg font-bold tracking-tight md:text-[30px]", hero ? "mt-3" : "mt-4 md:mt-7")}>{b.name}</h3>
                <p className={cn("mt-1 font-mono text-[11px] font-medium tracking-wide md:mt-2 md:text-[12.5px]", ACCENT_TEXT[b.accent])}>{b.req}</p>
                <p className="mt-3.5 hidden text-[15.5px] leading-relaxed text-muted md:block">{b.body}</p>
                <div className="mt-6 hidden w-full justify-between border-t border-line pt-4 font-mono text-[11px] tracking-wider md:flex">
                  <span className="text-muted">MINTED</span>
                  <span>{b.minted}</span>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-line bg-surface p-5 md:mt-10 md:flex-row md:items-center md:justify-between md:rounded-full md:py-3 md:pr-3 md:pl-8">
          <div className="flex items-center gap-4">
            <span aria-hidden className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-gold text-lg">
              🔒
            </span>
            <div>
              <p className="font-display text-lg font-bold tracking-tight md:text-[22px]">Minting closes the day the beta opens.</p>
              <p className="text-sm text-muted md:text-[15px]">After launch, no one can earn these. Not for money, not for followers.</p>
            </div>
          </div>
          <ButtonLink href="/#join" arrow size="lg">
            Claim my Day One badge
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
