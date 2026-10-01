import { Accent, Eyebrow } from "../ui/bits";

export function Manifesto() {
  return (
    <section className="bg-ink py-20 md:py-[150px]" aria-labelledby="why-title">
      <div className="container-x flex flex-col items-center text-center">
        <Eyebrow accent="coral">Why Sanji exists</Eyebrow>
        <h2 id="why-title" className="display mt-8 text-[clamp(52px,9vw,124px)] leading-[0.96]">
          <span className="block text-muted/45 line-through decoration-[0.06em]">Not the feed.</span>
          <span className="block text-muted/45 line-through decoration-[0.06em]">Not the noise.</span>
          <span className="block text-muted/45 line-through decoration-[0.06em]">Not who paid.</span>
          <span className="block">
            Just the <Accent className="text-lime">work.</Accent>
          </span>
        </h2>
        <p className="mt-10 max-w-[720px] text-base leading-relaxed text-muted md:text-[21px]">
          The most skilled people you know are invisible, and the loudest are famous. Sanji flips that. A portfolio-first home
          for every craft, sorted by art form, newest first, with nothing deciding for you who deserves to be seen.
        </p>
      </div>
    </section>
  );
}
