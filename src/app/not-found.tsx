import { SlimFooter } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { Glow } from "@/components/ui/bits";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-5 py-24 text-center">
        <Glow className="top-1/3 -left-40 size-[600px] bg-coral/35" />
        <Glow className="-top-20 -right-40 size-[600px] bg-violet/40" />
        <p className="relative bg-gradient-to-r from-coral to-violet bg-clip-text font-display text-[clamp(160px,30vw,300px)] leading-[0.85] font-extrabold tracking-[-0.08em] text-transparent">
          404
        </p>
        <h1 className="relative display mt-4 text-[clamp(36px,5vw,56px)]">
          This page <em className="accent text-coral">skipped the line.</em>
        </h1>
        <p className="relative mt-4 text-muted md:text-xl">It&apos;s not here. Your spot is safe though.</p>
        <div className="relative mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" arrow size="lg">
            Back to Sanji
          </ButtonLink>
          <ButtonLink href="/spot" variant="outline" size="lg">
            Check my spot
          </ButtonLink>
        </div>
      </main>
      <SlimFooter />
    </>
  );
}
