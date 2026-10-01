import { Accent, Eyebrow } from "../ui/bits";
import { ButtonLink } from "../ui/Button";
import { cn } from "@/lib/cn";

const DOORS = [
  {
    big: "MAKE",
    art: "bg-lime text-ink",
    title: "I make art",
    body: "Painters, dancers, photographers, musicians, filmmakers, poets. Show real skill, not a highlight reel.",
    cta: "Join as an artist",
    primary: true,
  },
  {
    big: "LOVE",
    art: "bg-violet text-paper",
    title: "I love art",
    body: "Follow the makers whose work stops you. See it first, in order, with no feed deciding for you.",
    cta: "Join as a fan",
  },
  {
    big: "HIRE",
    art: "bg-coral text-paper",
    title: "I hire art",
    body: "Galleries, studios, labels and brands. Find talent by craft and city, then message them directly.",
    cta: "Join as a scout",
  },
];

export function Doors() {
  return (
    <section className="bg-ink pb-20 md:pb-[140px]" aria-labelledby="doors-title">
      <div className="container-x">
        <Eyebrow accent="sky">Who it&apos;s for</Eyebrow>
        <h2 id="doors-title" className="display mt-6 text-[clamp(48px,7.5vw,96px)]">
          Three doors.
          <br />
          One <Accent className="text-sky">roof.</Accent>
        </h2>
        <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
          {DOORS.map((d) => (
            <article key={d.big} className="card group overflow-hidden md:rounded-[32px]">
              <div className={cn("relative h-[180px] overflow-hidden md:h-[230px]", d.art)}>
                <span
                  aria-hidden
                  className="absolute top-[40px] -left-3 font-display text-[150px] leading-none font-extrabold tracking-[-0.08em] transition-transform duration-500 group-hover:-translate-x-3 md:top-[70px] md:text-[190px]"
                >
                  {d.big}
                </span>
                <span aria-hidden className="absolute top-6 right-7 size-[70px] rounded-full border-2 border-current md:size-[90px]" />
              </div>
              <div className="flex flex-col gap-3.5 p-7 md:p-8">
                <h3 className="font-display text-[32px] font-bold tracking-tight md:text-4xl">{d.title}</h3>
                <p className="text-base leading-relaxed text-muted">{d.body}</p>
                <ButtonLink href="/#join" variant={d.primary ? "lime" : "outline"} arrow className="mt-3 self-start">
                  {d.cta}
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
