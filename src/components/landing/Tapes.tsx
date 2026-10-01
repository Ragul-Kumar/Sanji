import { Fragment } from "react";
import { cn } from "@/lib/cn";

function Tape({ words, className, serifAlt, reverse }: { words: string[]; className: string; serifAlt?: boolean; reverse?: boolean }) {
  const row = (
    <div className="flex shrink-0 items-center gap-7 pr-7">
      {words.map((w, i) => (
        <Fragment key={i}>
          <span
            className={cn(
              serifAlt && i % 2
                ? "font-serif text-[34px] italic md:text-[46px]"
                : "font-display text-[28px] font-extrabold tracking-[-0.04em] md:text-[40px]",
            )}
          >
            {w}
          </span>
          <span aria-hidden className="text-xl md:text-[26px]">
            ✺
          </span>
        </Fragment>
      ))}
    </div>
  );
  return (
    <div className={cn("absolute left-[-10%] w-[120%] overflow-hidden py-3.5 md:py-[18px]", className)}>
      <div className={cn("flex w-max", reverse ? "animate-marquee-rev" : "animate-marquee")}>
        {row}
        {row}
      </div>
    </div>
  );
}

export function Tapes() {
  return (
    <div aria-hidden className="relative h-[200px] overflow-hidden bg-ink md:h-[280px]">
      <Tape
        className="top-[95px] rotate-3 bg-violet text-paper md:top-[150px]"
        serifAlt
        reverse
        words={["PAINTERS", "dancers", "PHOTOGRAPHERS", "musicians", "FILMMAKERS", "poets", "SCULPTORS", "designers", "WRITERS", "every craft"]}
      />
      <Tape
        className="top-[40px] -rotate-3 bg-lime text-ink md:top-[60px]"
        words={["NO ALGORITHM", "NO CLOUT", "NO PAY-TO-BE-SEEN", "JUST THE WORK", "NO ALGORITHM", "NO CLOUT", "JUST THE WORK"]}
      />
    </div>
  );
}
