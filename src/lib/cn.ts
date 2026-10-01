import clsx, { type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge our custom tokens so e.g. `text-muted` and `text-sm` don't collide.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: ["ink", "surface", "surface-2", "line", "paper", "muted", "lime", "violet", "coral", "pink", "sky", "gold"],
      font: ["display", "serif", "sans", "mono"],
    },
  },
});

/** Joins class names; later Tailwind utilities override earlier conflicting ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-IN").format(n);
}
