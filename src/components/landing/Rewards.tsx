import { Accent, Eyebrow } from "../ui/bits";
import { Pass } from "../ui/Pass";
import { PASSES } from "@/lib/site";

const ROT = ["md:-rotate-[4deg]", "", "md:rotate-[4deg]"];

export function Rewards() {
  return (
    <section id="rewards" className="scroll-mt-24 bg-surface py-20 md:py-[140px]" aria-labelledby="rewards-title">
      <div className="container-x flex flex-col items-center text-center">
        <Eyebrow accent="pink">Unlock passes</Eyebrow>
        <h2 id="rewards-title" className="display mt-6 text-[clamp(48px,7.5vw,96px)]">
          Bring friends.
          <br />
          Collect <Accent className="text-pink">passes.</Accent>
        </h2>
        <p className="mt-5 max-w-[560px] text-base leading-relaxed text-muted md:text-xl">
          Every pass is real and stays yours. No points, no gimmicks, just better seats.
        </p>
      </div>
      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 md:mt-[72px] md:justify-center md:gap-6 md:overflow-visible md:px-10">
        {PASSES.map((p, i) => (
          <Pass
            key={p.id}
            no={p.no}
            requirement={p.requirement}
            title={p.title}
            body={p.body}
            tone={p.tone}
            className={`w-[280px] shrink-0 snap-center md:w-[376px] ${ROT[i]}`}
          />
        ))}
      </div>
      <p className="mt-10 text-center font-mono text-xs tracking-wide text-muted md:text-[12.5px]">
        Invites count once your friend confirms their email. Fair for everyone.
      </p>
    </section>
  );
}
