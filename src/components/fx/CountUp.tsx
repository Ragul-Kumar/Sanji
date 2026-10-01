"use client";

import { animate, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { formatNumber } from "@/lib/cn";

/** Animates a number toward `to` whenever it changes (numbers climbing down feels like progress). */
export function CountUp({ to, from, duration = 1.2, prefix = "#" }: { to: number; from?: number; duration?: number; prefix?: string }) {
  const reduce = useReducedMotion();
  const [val, setVal] = useState(from ?? to);
  const prev = useRef(from ?? to);

  useEffect(() => {
    if (reduce) return;
    const c = animate(prev.current, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    prev.current = to;
    return () => c.stop();
  }, [to, duration, reduce]);

  return (
    <span className="tabular-nums">
      {prefix}
      {formatNumber(reduce ? to : val)}
    </span>
  );
}
