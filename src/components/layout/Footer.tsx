import Link from "next/link";
import { SITE } from "@/lib/site";

const COLS = [
  {
    title: "Sanji",
    links: [
      { href: "/#how", label: "How it works" },
      { href: "/#rewards", label: "Rewards" },
      { href: "/leaderboard", label: "Leaderboard" },
      { href: "/#badges", label: "Founding badges" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: SITE.companyUrl, label: SITE.company },
      { href: "/spot", label: "Check my spot" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
  {
    title: "Follow",
    links: [
      { href: "https://instagram.com", label: "Instagram" },
      { href: "https://x.com", label: "X" },
      { href: "https://linkedin.com", label: "LinkedIn" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="overflow-hidden bg-ink pt-16 md:pt-20">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 md:flex-row md:justify-between md:px-16">
        <div>
          <p className="font-serif text-2xl italic md:text-[32px]">{SITE.tagline}</p>
          <p className="mt-2 text-[15px] text-muted">
            Built by{" "}
            <a href={SITE.companyUrl} target="_blank" rel="noopener noreferrer" className="text-paper/80 underline-offset-4 hover:text-paper hover:underline">
              {SITE.company}
            </a>
            , {SITE.city}.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-8 md:gap-20">
          {COLS.map((c) => (
            <div key={c.title}>
              <p className="eyebrow mb-4 text-lime">{c.title}</p>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("http") ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-[15px] text-paper/80 hover:text-paper">
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="text-[15px] text-paper/80 hover:text-paper">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p
        aria-hidden
        className="mt-10 bg-gradient-to-b from-lime via-violet via-60% to-ink bg-clip-text text-center font-display text-[34vw] leading-[0.8] font-extrabold tracking-[-0.06em] text-transparent select-none md:text-[min(30vw,440px)]"
      >
        sanji
      </p>
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-2 border-t border-line px-5 py-6 font-mono text-xs tracking-wide text-muted md:flex-row md:px-16">
        <span>© 2026 {SITE.company}</span>
        <span>No algorithm was harmed in the making of this page.</span>
      </div>
    </footer>
  );
}

export function SlimFooter({ note }: { note?: string }) {
  return (
    <footer className="mt-auto border-t border-line bg-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-2 px-5 py-6 font-mono text-xs tracking-wide text-muted md:flex-row md:px-16">
        <span>
          © 2026 {SITE.company} · {SITE.city}
        </span>
        <span className="flex gap-4">
          {note && <span>{note}</span>}
          <Link href="/privacy" className="hover:text-paper">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-paper">
            Terms
          </Link>
        </span>
      </div>
    </footer>
  );
}
