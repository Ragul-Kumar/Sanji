import { SignupForm } from "../SignupForm";
import { ArtTile } from "../ui/ArtTile";
import { Accent, Glow, Sticker } from "../ui/bits";
import { Ticket } from "../ui/Ticket";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-10 md:pt-20" aria-labelledby="hero-title">
      <Glow className="-left-[260px] top-[120px] size-[720px] bg-violet/45" />
      <Glow className="-top-[180px] -right-[200px] size-[620px] bg-coral/35" />
      <Glow className="top-[640px] left-1/2 size-[460px] -translate-x-1/2 bg-lime/20" />
      <div aria-hidden className="grid-lines absolute inset-0" />

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-5 text-center">
        <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-4 pl-1.5 text-[13px] font-medium md:text-sm">
          <span className="rounded-full bg-lime px-2.5 py-1 font-mono text-[11px] font-medium tracking-wider text-ink">NEW</span>
          <span className="hidden sm:inline">The art platform with no algorithm. Beta opens {SITE.betaLabel}.</span>
          <span className="sm:hidden">No-algorithm art platform</span>
        </p>

        <h1 id="hero-title" className="display mt-7 max-w-[1300px] text-[clamp(56px,10vw,138px)] md:mt-9">
          Skip the algorithm.
          <br />
          Join the <Accent className="text-lime">line.</Accent>
        </h1>

        <p className="mt-6 max-w-[680px] text-base leading-relaxed text-muted md:mt-7 md:text-xl">
          Sanji is one home for every kind of artist, where your work decides who sees you, not your follower count. Grab your
          number today. Every friend you bring moves you 500 spots closer to the front.
        </p>

        <SignupForm anchorId="join" className="mt-8 scroll-mt-32 md:mt-10" glow />

        <p className="mt-4 font-mono text-[11px] tracking-wide text-muted md:text-[12.5px]">
          ✓ Free in phase one &nbsp;&nbsp; ✓ No spam, ever &nbsp;&nbsp; ✓ Takes 20 seconds
        </p>
      </div>

      {/* Art wall */}
      <div aria-hidden className="relative mx-auto mt-14 h-[340px] max-w-[1440px] md:mt-16 md:h-[430px]">
        <div className="absolute top-[150px] left-[calc(50%-600px)] hidden rotate-[10deg] lg:block">
          <ArtTile kind="painting" />
        </div>
        <div className="absolute top-[110px] left-[calc(50%-80px-175px)] -rotate-[8deg] md:top-[90px] md:left-[calc(50%-370px)] md:rotate-[5deg]">
          <ArtTile kind="photography" className="scale-75 md:scale-100" />
        </div>
        <div className="absolute top-[60px] left-[calc(50%+200px)] hidden -rotate-[5deg] md:block">
          <ArtTile kind="music" />
        </div>
        <div className="absolute top-[120px] left-[calc(50%+380px)] hidden -rotate-[10deg] lg:block">
          <ArtTile kind="film" />
        </div>
        <div className="absolute top-[20px] left-1/2 -translate-x-1/2 animate-float">
          <Ticket
            number="#1,284"
            trend="▲ 1,500 spots"
            className="w-[230px] md:w-[320px]"
            footer={
              <div className="flex items-center justify-between">
                <span className="text-sm leading-tight font-medium">
                  3 friends joined
                  <br />
                  through your link
                </span>
                <span className="flex -space-x-2.5">
                  {["bg-violet", "bg-coral", "bg-sky"].map((c) => (
                    <span key={c} className={`size-[34px] rounded-full border-[3px] border-lime ${c}`} />
                  ))}
                </span>
              </div>
            }
          />
        </div>
        <Sticker tone="pink" className="absolute top-[10px] left-[4%] rotate-[8deg] md:top-[40px] md:left-[calc(50%-490px)]">
          No algorithm. Ever.
        </Sticker>
        <Sticker tone="coral" className="absolute top-[0px] right-[4%] -rotate-[8deg] md:top-[20px] md:right-auto md:left-[calc(50%+240px)]">
          +500 spots / invite
        </Sticker>
        <Sticker tone="sky" className="absolute top-[330px] left-[calc(50%+320px)] hidden rotate-6 lg:inline-flex">
          Free in phase one
        </Sticker>
        <div className="absolute top-[280px] left-[calc(50%+150px)] hidden size-[118px] -rotate-[14deg] flex-col items-center justify-center rounded-full bg-violet text-center md:flex">
          <span className="font-mono text-[11px] font-medium tracking-[0.2em]">EVERY</span>
          <span className="font-serif text-[34px] leading-none text-lime italic">craft</span>
          <span className="font-mono text-[11px] font-medium tracking-[0.2em]">WELCOME</span>
        </div>
      </div>
    </section>
  );
}
