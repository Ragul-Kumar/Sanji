"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { CountUp } from "../fx/CountUp";
import { Confetti } from "../fx/Confetti";
import { ButtonLink } from "../ui/Button";
import { Glow } from "../ui/bits";
import { CopyButton } from "../ui/CopyButton";
import { BadgeStatus, ClimbCalc, Nearby, PassLadder, passStatus } from "./Progress";
import { PassUnlocked } from "./PassUnlocked";
import { ShareKit } from "./ShareKit";
import { useMe } from "./useMe";
import { confirmEmail, demoFriendJoins, demoReset, signOut } from "@/lib/api";
import { formatNumber } from "@/lib/cn";
import { referralUrl } from "@/lib/share";
import { FEATURES, ROLES, SPOTS_PER_INVITE } from "@/lib/site";

const SEEN_KEY = "sanji:seen-passes";

export function YouDashboard() {
  const me = useMe();
  const router = useRouter();
  const params = useSearchParams();
  const isNew = params.get("new") === "1";
  const [unlocked, setUnlocked] = useState<string | null>(null);
  const shareRef = useRef<HTMLDivElement>(null);

  // Detect freshly unlocked passes and celebrate once.
  useEffect(() => {
    if (!me) return;
    let seen: string[] = [];
    try {
      seen = JSON.parse(localStorage.getItem(SEEN_KEY) ?? "[]");
    } catch {}
    const fresh = passStatus(me.invites, me.position).find((p) => p.unlocked && !seen.includes(p.id));
    if (!fresh) return;
    // Short beat so the number animation lands before the celebration.
    const t = setTimeout(() => {
      try {
        localStorage.setItem(SEEN_KEY, JSON.stringify([...seen, fresh.id]));
      } catch {}
      setUnlocked(fresh.id);
    }, 700);
    return () => clearTimeout(t);
  }, [me]);

  const closeModal = useCallback(() => setUnlocked(null), []);
  const shareNews = useCallback(() => {
    setUnlocked(null);
    shareRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (me === undefined) {
    return <div className="min-h-[70vh]" aria-busy="true" />;
  }

  if (me === null) {
    return (
      <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="eyebrow text-coral">No spot on this device</p>
        <h1 className="display mt-5 text-[clamp(48px,8vw,96px)]">
          Let&apos;s find <em className="accent text-lime">your spot.</em>
        </h1>
        <p className="mt-5 max-w-[480px] text-muted md:text-lg">Already joined on another device? We&apos;ll email you a one-tap link.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/spot" variant="outline" size="lg">
            Check my spot
          </ButtonLink>
          <ButtonLink href="/#join" size="lg" arrow>
            Get my number
          </ButtonLink>
        </div>
      </section>
    );
  }

  const roleLabel = ROLES.find((r) => r.value === me.role)?.label ?? "Artist";

  return (
    <>
      <section className="relative overflow-hidden pt-10 pb-14 md:pt-16 md:pb-20">
        <Glow className="-top-24 -left-60 size-[600px] bg-violet/40" />
        <Glow className="top-48 -right-40 size-[520px] bg-coral/30" />
        <Glow className="top-20 left-1/2 size-[480px] -translate-x-1/2 bg-lime/15" />
        {isNew && <Confetti count={80} height={560} />}

        <div className="relative container-x flex flex-col items-center text-center">
          {me.confirmed ? (
            <p className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-2 font-mono text-[11px] font-medium tracking-[0.08em] text-ink md:text-xs">
              ✓ SPOT LOCKED · EMAIL CONFIRMED
            </p>
          ) : (
            <Link
              href="/confirm"
              className="inline-flex items-center gap-2 rounded-full bg-lime px-4 py-2 font-mono text-[11px] font-medium tracking-[0.08em] text-ink md:text-xs"
            >
              ✓ YOU&apos;RE IN · CONFIRM YOUR EMAIL TO LOCK YOUR SPOT
            </Link>
          )}
          <p className="mt-8 font-serif text-2xl text-muted italic md:text-[34px]">Your number in line</p>
          <h1 className="bg-gradient-to-r from-lime to-sky bg-clip-text font-display text-[clamp(96px,20vw,280px)] leading-[0.9] font-extrabold tracking-[-0.07em] text-transparent">
            <CountUp to={me.position} from={isNew ? me.position + 900 : undefined} />
          </h1>
          <p className="mt-6 max-w-[680px] text-base leading-relaxed text-muted md:text-[21px]">
            {me.invites === 0
              ? `Welcome to the line. Now the fun part: every friend who joins through your link moves you ${SPOTS_PER_INVITE} spots up. Just one gets you into the First Wave.`
              : `You've moved up ${formatNumber(me.startPosition - me.position)} spots with ${me.invites} friend${me.invites > 1 ? "s" : ""}. Keep going.`}
          </p>
          <p className="mt-4 font-mono text-xs tracking-wide text-muted">
            {me.email} · {roleLabel}
          </p>
        </div>
      </section>

      <div ref={shareRef} className="container-x grid scroll-mt-24 gap-5 md:grid-cols-[1fr_460px]">
        <ShareKit code={me.code} position={me.position} />
        <PassLadder invites={me.invites} pending={me.pendingInvites} position={me.position} />
      </div>
      <div className="container-x mt-5 grid gap-5 pb-20 md:pb-[120px]">
        <ClimbCalc position={me.position} />
        <BadgeStatus position={me.position} />
      </div>

      <Nearby position={me.position} craft={roleLabel} />

      {/* Sticky mobile share bar */}
      <div className="sticky bottom-0 z-30 border-t border-line bg-surface/95 px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <CopyButton value={referralUrl(me.code)} label="Copy my link →" className="h-14 w-full text-base" />
      </div>

      {FEATURES.demoControls && (
        <aside
          aria-label="Demo controls"
          className="fixed right-4 bottom-24 z-40 w-[230px] rounded-2xl border border-line bg-surface/95 p-3 text-sm shadow-2xl backdrop-blur md:bottom-6"
        >
          <p className="px-1 pb-2 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">Demo · no backend</p>
          <div className="grid gap-1.5">
            <button type="button" onClick={() => demoFriendJoins()} className="rounded-xl bg-lime px-3 py-2 text-left font-semibold text-ink">
              + Simulate a friend joining
            </button>
            {!me.confirmed && (
              <button type="button" onClick={() => confirmEmail()} className="rounded-xl bg-surface-2 px-3 py-2 text-left">
                Confirm my email
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                signOut();
                router.push("/spot");
              }}
              className="rounded-xl bg-surface-2 px-3 py-2 text-left"
            >
              Sign out
            </button>
            <button
              type="button"
              onClick={() => {
                demoReset();
                localStorage.removeItem(SEEN_KEY);
                router.push("/");
              }}
              className="rounded-xl px-3 py-2 text-left text-coral"
            >
              Reset demo
            </button>
          </div>
        </aside>
      )}

      <PassUnlocked passId={unlocked} onClose={closeModal} onShare={shareNews} />
    </>
  );
}
