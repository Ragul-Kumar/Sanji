import { Accent, Eyebrow } from "../ui/bits";
import { cn } from "@/lib/cn";
import { SPOTS_PER_INVITE } from "@/lib/site";

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 bg-ink pb-20 md:pb-[140px]" aria-labelledby="how-title">
      <div className="container-x">
        <Eyebrow>How the line works</Eyebrow>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="how-title" className="display text-[clamp(46px,7vw,88px)]">
            Three moves
            <br />
            to the <Accent className="text-lime">front.</Accent>
          </h2>
          <p className="max-w-[400px] text-base leading-relaxed text-muted md:text-lg">
            Robinhood built a famous waitlist this way. We&apos;re doing it for artists, with your craft in the middle and nothing
            for sale.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:mt-14">
          <div className="grid gap-5 md:grid-cols-[1fr_400px]">
          {/* Claim */}
          <div className="card flex flex-col justify-between gap-8 overflow-hidden p-8 md:flex-row md:items-center md:rounded-[32px] md:p-11">
            <div className="max-w-[320px]">
              <p className="font-mono text-sm font-medium text-lime">01</p>
              <h3 className="mt-3 font-display text-[34px] leading-[1.05] font-bold tracking-tight md:text-[40px]">Claim your number</h3>
              <p className="mt-3 text-base leading-relaxed text-muted md:text-[17px]">
                Email plus your craft. That&apos;s it. Your number shows up the second you hit the button.
              </p>
            </div>
            <div aria-hidden className="flex flex-col items-end font-display font-extrabold tracking-[-0.06em]">
              <span className="text-[40px] opacity-25 md:text-[44px]">#2,784</span>
              <span className="text-xl opacity-30">↓</span>
              <span className="text-[50px] opacity-50 md:text-[56px]">#2,284</span>
              <span className="text-xl opacity-50">↓</span>
              <span className="text-[80px] leading-none text-lime md:text-[96px]">#1,284</span>
            </div>
          </div>
          {/* Rule */}
          <div className="flex min-h-[340px] flex-col justify-between rounded-[32px] bg-lime p-8 text-ink md:min-h-[440px] md:p-10">
            <p className="eyebrow">The rule</p>
            <div>
              <p className="font-display text-[120px] leading-[0.9] font-extrabold tracking-[-0.07em] md:text-[150px]">+{SPOTS_PER_INVITE}</p>
              <p className="mt-2 max-w-[300px] text-lg leading-snug font-medium md:text-xl">
                spots up for every friend who joins with your link.
              </p>
            </div>
          </div>
          </div>
          <div className="grid gap-5 md:grid-cols-[400px_1fr]">
          {/* Share */}
          <div className="card flex flex-col gap-4 p-8 md:rounded-[32px] md:p-10">
            <p className="font-mono text-sm font-medium text-lime">02</p>
            <h3 className="font-display text-[34px] leading-[1.05] font-bold tracking-tight md:text-[40px]">Share your link</h3>
            <p className="text-base leading-relaxed text-muted md:text-[17px]">Text it, post it, drop it in the group chat.</p>
            <div className="mt-2 flex items-center justify-between rounded-full border border-line bg-ink py-1.5 pr-1.5 pl-5">
              <span className="font-mono text-[15px]">sanji.in/r/you</span>
              <span className="rounded-full bg-lime px-4 py-2.5 text-sm font-semibold text-ink">Copy</span>
            </div>
            <div className="flex gap-2.5">
              {[
                ["WA", "bg-lime"],
                ["IG", "bg-pink"],
                ["X", "bg-paper"],
                ["✉", "bg-sky"],
              ].map(([l, c]) => (
                <span key={l} className={cn("inline-flex size-[52px] items-center justify-center rounded-full font-display font-bold text-ink", c)}>
                  {l}
                </span>
              ))}
            </div>
          </div>
          {/* Waves */}
          <div className="flex flex-col gap-4 rounded-[32px] bg-gradient-to-br from-violet to-[#2A1B6B] p-8 md:min-h-[400px] md:p-11">
            <p className="font-mono text-sm font-medium text-lime">03</p>
            <h3 className="font-display text-[34px] leading-[1.05] font-bold tracking-tight md:text-[40px]">Walk in first</h3>
            <p className="max-w-[460px] text-base leading-relaxed text-paper/75 md:text-[17px]">
              The beta opens from the front of the line, in waves. The higher you are, the sooner your door opens.
            </p>
            <div className="mt-auto grid grid-cols-4 gap-2 pt-6">
              {["Wave 1", "Wave 2", "Wave 3", "Public"].map((w, i) => (
                <div key={w}>
                  <div className={cn("h-3 rounded-full", i === 0 ? "bg-lime" : "bg-paper/25")} style={i ? { opacity: 1 - i * 0.2 } : undefined} />
                  <p className={cn("mt-2.5 text-sm font-semibold", i === 0 ? "text-lime" : "text-paper/70")}>{w}</p>
                  {i === 0 && (
                    <span className="mt-1 inline-block rounded-full bg-lime px-2 py-0.5 font-mono text-[9px] font-medium tracking-wider text-ink md:text-[10px]">
                      YOU&apos;RE HERE
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
