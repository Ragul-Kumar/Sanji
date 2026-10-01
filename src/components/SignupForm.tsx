"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { AlreadyInLineError, InvalidEmailError, signup } from "@/lib/api";
import { cn, formatNumber } from "@/lib/cn";
import { ROLES, type Role } from "@/lib/site";
import { checkEmail } from "@/lib/validate";

export type FormState = "idle" | "focus" | "valid" | "loading" | "invalid" | "disposable" | "already" | "success";

const MESSAGES: Partial<Record<FormState, { text: string; icon: string; color: string }>> = {
  invalid: { text: "That email looks unfinished. Try name@example.com", icon: "!", color: "text-coral" },
  disposable: { text: "Use an inbox you check. Temporary emails can't hold a spot or count as invites.", icon: "!", color: "text-pink" },
};

// Mobile: state border sits on the email field. Desktop: on the whole pill.
const BORDER: Record<FormState, string> = {
  idle: "border-line",
  focus: "border-lime shadow-[0_0_0_4px_rgba(200,255,46,0.18)]",
  valid: "border-lime",
  loading: "border-line",
  invalid: "border-coral shadow-[0_0_0_4px_rgba(255,91,58,0.18)]",
  disposable: "border-pink",
  already: "border-sky",
  success: "border-lime",
};
const BORDER_MD: Record<FormState, string> = {
  idle: "md:border-line",
  focus: "md:border-lime md:shadow-[0_0_0_4px_rgba(200,255,46,0.18)]",
  valid: "md:border-lime",
  loading: "md:border-line",
  invalid: "md:border-coral md:shadow-[0_0_0_4px_rgba(255,91,58,0.18)]",
  disposable: "md:border-pink",
  already: "md:border-sky",
  success: "md:border-lime",
};

export function SignupForm({
  refCode,
  ctaLabel = "Get my number",
  tone = "dark",
  demoState,
  demoEmail,
  className,
  glow = false,
  showRole = true,
  anchorId,
}: {
  refCode?: string | null;
  ctaLabel?: string;
  tone?: "dark" | "onLime";
  /** Forces a visual state (useful for design reviews). */
  demoState?: FormState;
  demoEmail?: string;
  className?: string;
  glow?: boolean;
  showRole?: boolean;
  anchorId?: string;
}) {
  const router = useRouter();
  const id = useId();
  const [email, setEmail] = useState(demoEmail ?? "");
  const [role, setRole] = useState<Role>("make");
  const [state, setState] = useState<FormState>("idle");
  const [focused, setFocused] = useState(false);
  const [number, setNumber] = useState<number | null>(null);

  const s: FormState = demoState ?? (state === "idle" && focused ? "focus" : state);
  const msg = MESSAGES[s];

  function onChange(v: string) {
    setEmail(v);
    if (state === "loading" || state === "success") return;
    setState(checkEmail(v) === "ok" ? "valid" : "idle");
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (demoState) return;
    if (s === "already") {
      router.push("/you");
      return;
    }
    const check = checkEmail(email);
    if (check === "empty" || check === "invalid") return setState("invalid");
    if (check === "disposable") return setState("disposable");
    setState("loading");
    try {
      // TODO(backend): verify Cloudflare Turnstile token before calling signup.
      const me = await signup({ email, role, craft: "Other", ref: refCode });
      setNumber(me.position);
      setState("success");
      setTimeout(() => router.push("/you?new=1"), 750);
    } catch (err) {
      if (err instanceof AlreadyInLineError) {
        setNumber(err.me.position);
        setState("already");
      } else if (err instanceof InvalidEmailError) {
        setState(err.reason === "disposable" ? "disposable" : "invalid");
      } else {
        setState("invalid");
      }
    }
  }

  const onLime = tone === "onLime";
  const fieldBg = onLime ? "bg-ink" : "bg-surface";
  const btnClass =
    s === "already"
      ? "bg-sky text-ink"
      : onLime
        ? "bg-ink text-lime md:bg-lime md:text-ink"
        : "bg-lime text-ink hover:bg-[#d6ff5c]";

  const shownNumber = number ?? 2784;

  return (
    <form onSubmit={onSubmit} noValidate className={cn("w-full max-w-[640px]", className)} id={anchorId}>
      <div
        className={cn(
          "flex flex-col gap-2.5 md:flex-row md:items-center md:gap-4 md:rounded-full md:border-[1.5px] md:p-2 md:pl-7 md:transition-all",
          onLime ? "md:bg-ink" : "md:bg-surface",
          BORDER_MD[s],
          glow && s === "idle" && "md:shadow-[0_0_60px_rgba(200,255,46,0.16)]",
        )}
      >
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <div
          className={cn(
            "flex h-[58px] items-center gap-2 rounded-full md:flex-1 border-[1.5px] px-6 md:h-auto md:border-0 md:bg-transparent! md:p-0 md:shadow-none!",
            fieldBg,
            BORDER[s],
          )}
        >
          <input
            id={`${id}-email`}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@studio.com"
            value={email}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={s === "loading" || s === "success"}
            aria-invalid={s === "invalid" || s === "disposable"}
            aria-describedby={`${id}-msg`}
            className="w-full min-w-0 bg-transparent text-[17px] text-paper placeholder:text-muted focus:outline-none md:text-lg"
            style={{ outline: "none" }}
          />
          {s === "valid" && <span aria-hidden className="font-semibold text-lime">✓</span>}
        </div>

        {showRole && (
          <>
            <span aria-hidden className="hidden h-7 w-px bg-line md:block" />
            <label htmlFor={`${id}-role`} className="sr-only">
              I am joining as
            </label>
            <div className={cn("relative flex h-[58px] items-center rounded-full border-[1.5px] border-line px-6 md:h-auto md:border-0 md:bg-transparent! md:px-0", fieldBg)}>
              <select
                id={`${id}-role`}
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full appearance-none bg-transparent pr-6 text-base font-medium text-paper focus:outline-none md:w-auto"
              >
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value} className="bg-surface">
                    {r.label}
                  </option>
                ))}
              </select>
              <span aria-hidden className="pointer-events-none absolute right-6 text-muted md:right-0">
                ⌄
              </span>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={s === "loading" || s === "success" || (s === "disposable" && !!demoState)}
          className={cn(
            "group inline-flex h-[58px] shrink-0 items-center justify-center gap-2.5 rounded-full px-8 text-[17px] font-semibold transition-all active:scale-[0.98] md:h-[60px]",
            btnClass,
            s === "loading" && "opacity-85",
            s === "disposable" && "opacity-40",
          )}
        >
          {s === "loading" && (
            <span aria-hidden className="size-[18px] animate-spin rounded-full border-[2.5px] border-ink border-r-transparent" />
          )}
          {s === "loading"
            ? "Saving your spot…"
            : s === "success"
              ? `You're #${formatNumber(shownNumber)} ✓`
              : s === "already"
                ? "Check my spot"
                : ctaLabel}
          {s !== "loading" && s !== "success" && (
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          )}
        </button>
      </div>

      <div id={`${id}-msg`} aria-live="polite" className="min-h-0">
        {msg && (
          <p className={cn("mt-3 flex items-start gap-2 px-2 text-sm md:px-7", msg.color)}>
            <span aria-hidden className="font-semibold">
              {msg.icon}
            </span>
            {msg.text}
          </p>
        )}
        {s === "already" && (
          <p className="mt-3 flex items-start gap-2 px-2 text-sm text-sky md:px-7">
            <span aria-hidden>✺</span>
            <span>
              You&apos;re already #{formatNumber(shownNumber)} in line.{" "}
              <Link href="/you" className="underline underline-offset-2">
                See your spot
              </Link>
              .
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
