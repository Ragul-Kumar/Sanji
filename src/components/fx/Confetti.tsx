"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMemo } from "react";

const COLORS = ["#C8FF2E", "#7C5CFF", "#FF5B3A", "#FF9EE6", "#6FD3FF"];

// Deterministic PRNG so renders stay pure (and server/client agree).
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Falling confetti burst. Render it client-side only (inside a mounted tree). */
export function Confetti({
  count = 60,
  height = 600,
  seed = 7,
  className,
}: {
  count?: number;
  height?: number;
  seed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const pieces = useMemo(() => {
    const r = rng(seed);
    return Array.from({ length: count }, (_, i) => ({
      i,
      left: r() * 100,
      w: 6 + r() * 9,
      h: 5 + r() * 8,
      round: r() > 0.55,
      color: COLORS[i % COLORS.length],
      delay: r() * 0.6,
      dur: 2.2 + r() * 1.8,
      rot: r() * 540 - 270,
      drift: r() * 80 - 40,
    }));
  }, [count, seed]);
  if (reduce) return null;
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 overflow-hidden ${className ?? ""}`} style={{ height }}>
      {pieces.map((p) => (
        <motion.span
          key={p.i}
          className="absolute top-0 block"
          style={{ left: `${p.left}%`, width: p.w, height: p.h, background: p.color, borderRadius: p.round ? 999 : 2 }}
          initial={{ y: -30, x: 0, rotate: 0, opacity: 1 }}
          animate={{ y: height, x: p.drift, rotate: p.rot, opacity: [1, 1, 0] }}
          transition={{ duration: p.dur, delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}
