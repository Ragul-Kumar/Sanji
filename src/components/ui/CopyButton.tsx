"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function CopyButton({
  value,
  label = "Copy link",
  className,
  variant = "lime",
}: {
  value: string;
  label?: string;
  className?: string;
  variant?: "lime" | "dark";
}) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={cn(
        "inline-flex h-11 shrink-0 items-center justify-center rounded-full px-5 text-sm font-semibold transition-all active:scale-[0.97]",
        variant === "lime" ? "bg-lime text-ink hover:bg-[#d6ff5c]" : "bg-ink text-lime",
        className,
      )}
    >
      {copied ? "Copied ✓" : label}
    </button>
  );
}
