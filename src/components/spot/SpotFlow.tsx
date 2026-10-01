"use client";

import Link from "next/link";
import { useEffect, useId, useState, type FormEvent } from "react";
import { ButtonLink } from "../ui/Button";
import { requestMagicLink } from "@/lib/api";
import { cn } from "@/lib/cn";
import { checkEmail } from "@/lib/validate";

export function SpotFlow() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState<"form" | "loading" | "sent">("form");
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function submit(e?: FormEvent) {
    e?.preventDefault();
    if (checkEmail(email) !== "ok") {
      setError("That email looks unfinished. Try name@example.com");
      return;
    }
    setError(null);
    setStage("loading");
    await requestMagicLink(email);
    // Always show "sent" (don't reveal whether an email is in line).
    setStage("sent");
    setCooldown(45);
  }

  if (stage === "sent") {
    return (
      <div className="flex flex-col items-center text-center">
        <div aria-hidden className="relative h-[150px] w-[200px] -rotate-6">
          <div className="absolute top-6 left-2 h-[120px] w-[180px] rounded-[22px] bg-lime" />
          <svg className="absolute top-[40px] left-2" width="180" height="70" viewBox="0 0 180 70" fill="none">
            <path d="M10 0 L90 54 L170 0" stroke="#09090B" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="absolute top-0 right-0 inline-flex size-12 items-center justify-center rounded-full bg-coral font-display text-xl font-bold">
            1
          </span>
        </div>
        <h1 className="display mt-10 text-[clamp(60px,10vw,120px)]">
          Check your
          <br />
          <em className="accent text-sky">inbox.</em>
        </h1>
        <p className="mt-6 max-w-[520px] text-base leading-relaxed text-muted md:text-xl">
          If <span className="text-paper">{email}</span> is in line, we just sent it a one-tap link. Open it on this device to see your spot.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            disabled={cooldown > 0}
            onClick={() => submit()}
            className="inline-flex h-12 items-center rounded-full border-[1.5px] border-line px-6 font-semibold disabled:text-muted"
          >
            {cooldown > 0 ? `Resend in 0:${String(cooldown).padStart(2, "0")}` : "Resend link"}
          </button>
          <button
            type="button"
            onClick={() => setStage("form")}
            className="inline-flex h-12 items-center rounded-full border-[1.5px] border-line px-6 font-semibold"
          >
            Use a different email
          </button>
        </div>
        <Link href="/spot/verify" className="mt-8 rounded-full bg-surface-2 px-4 py-2 font-mono text-xs text-muted hover:text-paper">
          Demo: open the magic link →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid items-center gap-12 md:grid-cols-[1fr_480px] md:gap-20">
      <div>
        <p className="eyebrow text-lime">Check my spot</p>
        <h1 className="display mt-5 text-[clamp(64px,10vw,120px)]">
          Where am I
          <br />
          <em className="accent text-lime">in line?</em>
        </h1>
        <p className="mt-6 max-w-[500px] text-base leading-relaxed text-muted md:text-xl">
          See your number, your invites and your passes. No password, we&apos;ll email you a one-tap link.
        </p>
      </div>
      <form onSubmit={submit} noValidate className="card flex flex-col gap-4 p-6 md:rounded-[32px] md:p-10">
        <label htmlFor={`${id}-email`} className="text-[15px] font-medium text-muted">
          Your email
        </label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          placeholder="you@studio.com"
          aria-invalid={!!error}
          aria-describedby={`${id}-err`}
          className={cn(
            "h-[62px] rounded-[18px] border-[1.5px] bg-ink px-5 text-lg placeholder:text-muted focus:border-lime focus:shadow-[0_0_0_4px_rgba(200,255,46,0.2)] focus:outline-none",
            error ? "border-coral" : "border-line",
          )}
        />
        <p id={`${id}-err`} aria-live="polite" className="text-sm text-coral empty:hidden">
          {error}
        </p>
        <button
          type="submit"
          disabled={stage === "loading"}
          className="inline-flex h-[60px] items-center justify-center gap-2.5 rounded-full bg-lime text-[17px] font-semibold text-ink transition-all hover:bg-[#d6ff5c] disabled:opacity-80"
        >
          {stage === "loading" && <span className="size-[18px] animate-spin rounded-full border-[2.5px] border-ink border-r-transparent" />}
          {stage === "loading" ? "Sending…" : "Send my magic link →"}
        </button>
        <div className="my-1 flex items-center gap-3 text-muted">
          <span className="h-px flex-1 bg-line" />
          <span className="font-mono text-xs">not in line yet?</span>
          <span className="h-px flex-1 bg-line" />
        </div>
        <ButtonLink href="/#join" variant="outline" size="lg" arrow>
          Get my number
        </ButtonLink>
      </form>
    </div>
  );
}
