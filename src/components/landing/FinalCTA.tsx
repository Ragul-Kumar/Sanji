import type { ReactNode } from "react";
import { SignupForm } from "../SignupForm";
import { Accent, Eyebrow, Sticker } from "../ui/bits";
import { SITE } from "@/lib/site";

export function FinalCTA({
  title = (
    <>
      Your spot
      <br />
      is <Accent>waiting.</Accent>
    </>
  ),
  body = `Take your number now. Bring the artists you believe in. Walk in first when Sanji opens in ${SITE.betaLabel}.`,
  refCode,
  ctaLabel,
}: {
  title?: ReactNode;
  body?: string;
  refCode?: string | null;
  ctaLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-lime py-24 text-ink md:py-40" aria-labelledby="cta-title">
      <span aria-hidden className="absolute -top-40 -left-52 size-[520px] rounded-full border-2 border-ink/10" />
      <span aria-hidden className="absolute top-96 -right-40 size-[560px] rounded-full border-2 border-ink/10" />
      <Sticker tone="ink" className="absolute top-20 left-[8%] hidden -rotate-[10deg] lg:inline-flex">
        #1 → First Wave
      </Sticker>
      <Sticker tone="violet" className="absolute top-28 right-[8%] hidden rotate-[9deg] lg:inline-flex">
        +500 per invite
      </Sticker>
      <Sticker tone="coral" className="absolute bottom-24 left-[10%] hidden rotate-[7deg] lg:inline-flex">
        Founding Artist ✺
      </Sticker>

      <div className="container-x relative flex flex-col items-center text-center">
        <Eyebrow accent="ink">The door opens once</Eyebrow>
        <h2 id="cta-title" className="display mt-7 text-[clamp(64px,12vw,168px)] leading-[0.88]">
          {title}
        </h2>
        <p className="mt-7 max-w-[620px] text-base leading-relaxed text-ink/75 md:text-[21px]">{body}</p>
        <SignupForm tone="onLime" refCode={refCode} ctaLabel={ctaLabel} showRole={false} className="mt-10 max-w-[560px] md:mt-11" />
        <p className="mt-4 font-mono text-xs font-medium tracking-[0.08em] text-ink/60">FREE · NO SPAM · 20 SECONDS</p>
      </div>
    </section>
  );
}
