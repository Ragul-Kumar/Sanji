"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ButtonLink } from "../ui/Button";
import { Wordmark } from "../ui/Logo";

const LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/#rewards", label: "Rewards" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav({ right, minimal = false }: { right?: ReactNode; minimal?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled ? "border-b border-line/70 bg-ink/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:h-[84px] md:px-16" aria-label="Main">
        <Wordmark size={30} />

        {!minimal && (
          <ul className="hidden items-center gap-1.5 rounded-full border border-line bg-surface p-1.5 lg:flex">
            {LINKS.map((l) => {
              const active = l.href === pathname;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "inline-flex rounded-full px-[18px] py-2.5 text-sm font-medium transition-colors",
                      active ? "bg-surface-2 text-paper" : "text-muted hover:text-paper",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        <div className="flex items-center gap-2.5">
          {right ?? (
            <>
              <ButtonLink href="/spot" variant="outline" className="hidden md:inline-flex">
                Check my spot
              </ButtonLink>
              <ButtonLink href="/#join" arrow size="md" className="h-10 px-4 text-sm md:h-12 md:px-6 md:text-[15px]">
                Get in line
              </ButtonLink>
            </>
          )}
          {!minimal && (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative inline-flex size-10 items-center justify-center rounded-full bg-surface lg:hidden"
            >
              <span className={cn("absolute h-0.5 w-4 rounded bg-paper transition-transform", open ? "rotate-45" : "-translate-y-[3px]")} />
              <span className={cn("absolute h-0.5 w-4 rounded bg-paper transition-transform", open ? "-rotate-45" : "translate-y-[3px]")} />
            </button>
          )}
        </div>
      </nav>

      {open && !minimal && (
        <div className="fixed inset-x-0 top-[72px] bottom-0 z-40 flex flex-col gap-2 bg-ink px-5 pt-6 pb-10 lg:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-5 font-display text-4xl font-extrabold tracking-tight"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-auto grid gap-3">
            <ButtonLink href="/spot" variant="outline" size="lg" onClick={() => setOpen(false)}>
              Check my spot
            </ButtonLink>
            <ButtonLink href="/#join" size="lg" arrow onClick={() => setOpen(false)}>
              Get my number
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
