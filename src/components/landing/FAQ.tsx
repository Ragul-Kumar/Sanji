import { Accent, Eyebrow } from "../ui/bits";
import { ButtonLink } from "../ui/Button";
import { SITE, SPOTS_PER_INVITE } from "@/lib/site";

export const FAQS = [
  { q: "Is it free?", a: "Yes. Sanji is free through all of phase one. We want the room full of work, not the till full of money." },
  { q: "When does the beta open?", a: `${SITE.betaLabel[0].toUpperCase()}${SITE.betaLabel.slice(1)}. People are let in from the front of the line, in waves.` },
  {
    q: "How does my spot move?",
    a: `Every friend who joins through your link moves you ${SPOTS_PER_INVITE} spots up. An invite counts once they confirm their email.`,
  },
  { q: "Do I need a portfolio to join?", a: "No. Your email and your craft hold your spot. You build your profile when your door opens." },
  { q: "Who can join?", a: "Every kind of artist at every level, plus people who love art or hire it. No gatekeeping." },
  { q: "Who's behind Sanji?", a: `${SITE.company}, a small team in ${SITE.city} building the place we wanted as artists.` },
];

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 bg-surface py-20 md:py-[140px]" aria-labelledby="faq-title">
      <div className="container-x grid gap-12 md:grid-cols-[400px_1fr] md:gap-20">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>FAQ</Eyebrow>
          <h2 id="faq-title" className="display text-[clamp(48px,7vw,88px)]">
            Got
            <br />
            <Accent className="text-lime">questions?</Accent>
          </h2>
          <p className="max-w-[340px] text-base leading-relaxed text-muted md:text-[17px]">
            Anything else, write to the founders. A real person reads every message.
          </p>
          <ButtonLink href="mailto:hello@sanji.in" variant="outline" arrow>
            Message the team
          </ButtonLink>
        </div>
        <div className="flex flex-col gap-2.5">
          {FAQS.map((f, i) => (
            <details key={f.q} open={i === 0} className="group rounded-[20px] bg-ink px-6 py-6 open:pb-7 md:px-8 md:py-7">
              <summary className="flex cursor-pointer list-none items-center gap-6 [&::-webkit-details-marker]:hidden">
                <span className="flex-1 font-display text-xl leading-snug font-bold tracking-tight md:text-2xl">{f.q}</span>
                <span
                  aria-hidden
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-2 text-xl text-lime transition-colors group-open:bg-lime group-open:text-ink"
                >
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">–</span>
                </span>
              </summary>
              <p className="mt-3.5 max-w-[600px] text-base leading-relaxed text-muted md:text-[17px]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
