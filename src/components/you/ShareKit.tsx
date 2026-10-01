"use client";

import { useState } from "react";
import { CopyButton } from "../ui/CopyButton";
import { cn } from "@/lib/cn";
import { referralLabel, referralUrl, shareMessage, shareTargets } from "@/lib/share";

export function ShareKit({ code, position, className }: { code: string; position?: number; className?: string }) {
  const [message, setMessage] = useState(() => shareMessage(code));
  const [editing, setEditing] = useState(false);
  const t = shareTargets(code);
  const enc = encodeURIComponent(message);

  const buttons = [
    { label: "WhatsApp", href: `https://wa.me/?text=${enc}`, cls: "bg-lime text-ink" },
    { label: "Instagram story", href: position ? `${t.storyImage}?n=${position}` : t.storyImage, cls: "bg-pink text-ink", download: true },
    { label: "Post on X", href: `https://twitter.com/intent/tweet?text=${enc}`, cls: "bg-paper text-ink" },
    { label: "LinkedIn", href: t.linkedin, cls: "bg-sky text-ink" },
    { label: "Email", href: `mailto:?subject=${encodeURIComponent("Saved you a spot on Sanji")}&body=${enc}`, cls: "bg-surface-2 text-paper" },
  ];

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Sanji", text: message, url: referralUrl(code) });
      } catch {}
    }
  }

  return (
    <section className={cn("rounded-[32px] bg-surface p-6 ring-1 ring-line md:bg-ink md:p-10", className)} aria-labelledby="share-title">
      <p className="eyebrow text-lime">Your link</p>
      <div className="mt-4 flex items-center justify-between gap-3 rounded-full border border-line bg-ink py-2 pr-2 pl-5 md:bg-surface md:pl-6">
        <span className="truncate font-mono text-[15px] font-medium md:text-xl">{referralLabel(code)}</span>
        <CopyButton value={referralUrl(code)} />
      </div>

      <h2 id="share-title" className="mt-8 font-display text-2xl font-bold tracking-tight md:text-[30px]">
        Send it where your people are
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
        {buttons.map((b) => (
          <a
            key={b.label}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            download={b.download ? `sanji-${code}.png` : undefined}
            className={cn("inline-flex h-12 items-center justify-center rounded-full px-5 text-[15px] font-semibold transition-transform active:scale-[0.97] hover:-translate-y-0.5", b.cls)}
          >
            {b.label}
          </a>
        ))}
        <button
          type="button"
          onClick={nativeShare}
          className="inline-flex h-12 items-center justify-center rounded-full bg-surface-2 px-5 text-[15px] font-semibold sm:hidden"
        >
          More…
        </button>
      </div>

      <div className="mt-6 rounded-[20px] bg-surface-2 px-5 py-5 md:px-6">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">Ready-to-send message</p>
          <button type="button" onClick={() => setEditing((e) => !e)} className="text-sm font-semibold text-lime">
            {editing ? "Done" : "Edit"}
          </button>
        </div>
        {editing ? (
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            aria-label="Share message"
            className="mt-3 w-full resize-none rounded-xl bg-ink p-3 text-base leading-relaxed text-paper focus:outline-none"
          />
        ) : (
          <p className="mt-3 text-base leading-relaxed text-paper/90">{message}</p>
        )}
        <CopyButton value={message} label="Copy message" variant="dark" className="mt-4 h-10 bg-ink" />
      </div>
    </section>
  );
}
