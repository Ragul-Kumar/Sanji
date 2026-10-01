import { cn, formatNumber } from "@/lib/cn";
import type { Leader } from "@/lib/sample-data";

const GRADS = ["from-coral to-pink", "from-sky to-violet", "from-pink to-lime"];

export function Podium({ leaders, className }: { leaders: Leader[]; className?: string }) {
  const [first, second, third] = leaders;
  const order = [
    // Minimum heights keep the 2-1-3 podium step; cards still grow to fit their content.
    { l: second, h: "md:min-h-[430px]", grad: GRADS[1], top: false },
    { l: first, h: "md:min-h-[490px]", grad: GRADS[0], top: true },
    { l: third, h: "md:min-h-[400px]", grad: GRADS[2], top: false },
  ];
  return (
    <ol className={cn("grid gap-3 md:grid-cols-3 md:items-end md:gap-5", className)}>
      {order.map(({ l, h, grad, top }) =>
        l ? (
          <li
            key={l.rank}
            className={cn(
              "flex min-h-[200px] flex-col justify-between gap-8 rounded-[32px] p-7 md:p-8",
              h,
              top ? "order-first bg-lime text-ink md:order-none" : "border border-line bg-surface",
            )}
          >
            <div className="flex items-start justify-between">
              <span aria-hidden className={cn("size-[72px] rounded-full bg-gradient-to-br", grad)} />
              <span
                className={cn(
                  "font-display leading-[0.8] font-extrabold tracking-[-0.06em]",
                  top ? "text-[110px] md:text-[140px]" : "text-[90px] opacity-25 md:text-[110px]",
                )}
              >
                {l.rank}
              </span>
            </div>
            <div>
              <p className="font-display text-[28px] font-bold tracking-tight md:text-[30px]">{l.name}</p>
              <p className={cn("text-[15px]", top ? "text-ink/65" : "text-muted")}>
                {l.craft} · {l.city}
              </p>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-[40px] font-extrabold tracking-tight md:text-[44px]">{formatNumber(l.invited)}</span>
                <span className={cn("text-sm", top ? "text-ink/65" : "text-muted")}>artists brought in</span>
              </p>
            </div>
          </li>
        ) : null,
      )}
    </ol>
  );
}
