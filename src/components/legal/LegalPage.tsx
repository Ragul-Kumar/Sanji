import Link from "next/link";
import { Footer } from "../layout/Footer";
import { Nav } from "../layout/Nav";
import { cn } from "@/lib/cn";

const NUM = ["text-lime", "text-sky", "text-coral", "text-pink", "text-violet", "text-lime", "text-sky", "text-coral"];

export function LegalPage({
  active,
  title,
  accent,
  intro,
  sections,
}: {
  active: "privacy" | "terms";
  title: string;
  accent: string;
  intro: string;
  sections: { title: string; body: string }[];
}) {
  return (
    <>
      <Nav />
      <main>
        <header className="container-x pt-14 pb-12 md:pt-20 md:pb-14">
          <p className="inline-flex rounded-full bg-coral px-3 py-1.5 font-mono text-[11px] font-medium tracking-[0.1em]">
            DRAFT · NEEDS LEGAL REVIEW BEFORE LAUNCH
          </p>
          <h1 className="display mt-6 text-[clamp(52px,8vw,96px)]">
            {title} <em className="accent text-lime">{accent}</em>
          </h1>
          <p className="mt-5 max-w-[720px] text-base leading-relaxed text-muted md:text-xl">{intro}</p>
          <nav className="mt-8 inline-flex gap-1 rounded-full bg-surface p-1" aria-label="Legal pages">
            {(["privacy", "terms"] as const).map((p) => (
              <Link
                key={p}
                href={`/${p}`}
                aria-current={active === p ? "page" : undefined}
                className={cn("rounded-full px-5 py-2.5 text-sm font-semibold capitalize", active === p ? "bg-lime text-ink" : "text-muted hover:text-paper")}
              >
                {p}
              </Link>
            ))}
          </nav>
        </header>
        <div className="container-x grid gap-10 pb-24 md:grid-cols-[260px_1fr] md:gap-20 md:pb-[120px]">
          <nav aria-label="On this page" className="hidden md:block">
            <ol className="sticky top-28 grid gap-3.5">
              {sections.map((s, i) => (
                <li key={s.title}>
                  <a href={`#s${i + 1}`} className="text-[15px] text-muted hover:text-paper">
                    {String(i + 1).padStart(2, "0")}&nbsp;&nbsp;{s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="grid gap-4">
            {sections.map((s, i) => (
              <section key={s.title} id={`s${i + 1}`} className="card flex scroll-mt-28 gap-6 rounded-3xl p-7 md:gap-7 md:p-8">
                <span className={cn("font-display text-4xl font-extrabold tracking-tight", NUM[i % NUM.length])}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="font-display text-2xl font-bold tracking-tight md:text-[28px]">{s.title}</h2>
                  <p className="mt-2 max-w-[640px] text-base leading-relaxed text-muted md:text-[17px]">{s.body}</p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
