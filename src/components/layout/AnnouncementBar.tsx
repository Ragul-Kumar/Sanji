import Link from "next/link";
import type { ReactNode } from "react";

export function AnnouncementBar({ children, href = "/#join" }: { children: ReactNode; href?: string }) {
  return (
    <Link
      href={href}
      className="group block bg-lime px-4 py-3 text-center font-mono text-[11px] font-medium tracking-[0.08em] text-ink uppercase md:text-[12.5px]"
    >
      <span aria-hidden className="mr-2">✺</span>
      {children}
      <span aria-hidden className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
    </Link>
  );
}
