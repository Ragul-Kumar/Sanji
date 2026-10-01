"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { Confetti } from "../fx/Confetti";
import { cn } from "@/lib/cn";
import { PASSES } from "@/lib/site";

const TONE: Record<string, string> = {
  lime: "bg-lime",
  "pink-sky": "bg-gradient-to-br from-pink to-sky",
  coral: "bg-gradient-to-br from-coral to-[#FFB36B]",
};

export function PassUnlocked({
  passId,
  onClose,
  onShare,
}: {
  passId: string | null;
  onClose: () => void;
  onShare: () => void;
}) {
  const pass = PASSES.find((p) => p.id === passId);
  const closeRef = useRef<HTMLButtonElement>(null);
  const next = pass ? PASSES[PASSES.indexOf(pass) + 1] : undefined;

  useEffect(() => {
    if (!pass) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pass, onClose]);

  return (
    <AnimatePresence>
      {pass && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="unlock-title"
        >
          <div className="absolute inset-0 bg-ink/75 backdrop-blur-md" onClick={onClose} />
          <Confetti count={70} height={420} />
          <motion.div
            className="relative w-full rounded-t-[36px] border border-line bg-surface px-6 pt-4 pb-9 text-center shadow-[0_0_120px_rgba(200,255,46,0.25)] md:w-[560px] md:rounded-[40px] md:px-12 md:pt-12 md:pb-11"
            initial={{ y: 80, scale: 0.96 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
          >
            <span aria-hidden className="mx-auto mb-6 block h-1.5 w-10 rounded-full bg-line md:hidden" />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 hidden size-10 items-center justify-center rounded-full bg-surface-2 text-muted hover:text-paper md:inline-flex"
            >
              ✕
            </button>
            <motion.div
              className={cn("mx-auto flex h-[230px] w-[180px] -rotate-6 flex-col justify-between rounded-3xl p-5 text-left text-ink md:h-[280px] md:w-[220px]", TONE[pass.tone])}
              initial={{ rotate: -30, scale: 0.6 }}
              animate={{ rotate: -6, scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 180, delay: 0.1 }}
            >
              <span className="flex justify-between font-mono text-[11px] font-medium tracking-wider">
                {pass.no} <span>✺</span>
              </span>
              <span className="font-display text-[44px] leading-[0.88] font-extrabold tracking-[-0.05em] md:text-[58px]">
                {pass.title.split(" ").map((w) => (
                  <span key={w} className="block">
                    {w}
                  </span>
                ))}
              </span>
            </motion.div>
            <p className="mt-7 eyebrow text-lime">Pass unlocked</p>
            <h2 id="unlock-title" className="display mt-2 text-[40px] md:text-[56px]">
              You got <em className="accent text-lime">{pass.title}.</em>
            </h2>
            <p className="mx-auto mt-3.5 max-w-[440px] text-base leading-relaxed text-muted md:text-[17px]">{pass.body}</p>
            <div className="mt-7 grid gap-2.5 md:grid-cols-2">
              <button type="button" onClick={onShare} className="h-14 rounded-full bg-lime font-semibold text-ink">
                Share the news →
              </button>
              <button type="button" onClick={onClose} className="h-14 rounded-full border-[1.5px] border-line font-semibold">
                Keep climbing
              </button>
            </div>
            {next && (
              <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-mono text-xs text-muted">
                Next: {next.title} · {next.requirement}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
