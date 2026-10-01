import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "lime" | "dark" | "outline" | "ghost" | "sky";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  lime: "bg-lime text-ink hover:bg-[#d6ff5c] shadow-[0_0_0_0_rgba(200,255,46,0)] hover:shadow-[0_10px_40px_-10px_rgba(200,255,46,0.6)]",
  dark: "bg-ink text-paper hover:bg-surface-2",
  outline: "border-[1.5px] border-line text-paper hover:border-paper/40 hover:bg-paper/5",
  ghost: "text-muted hover:text-paper",
  sky: "bg-sky text-ink hover:bg-[#93deff]",
};

const SIZES: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[15px]",
  lg: "h-[60px] px-8 text-[17px]",
};

type Common = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

const base =
  "group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      {children}
      {arrow && (
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
          →
        </span>
      )}
    </>
  );
}

export function Button({
  variant = "lime",
  size = "md",
  arrow,
  className,
  children,
  ...rest
}: Common & Omit<ComponentProps<"button">, "children">) {
  return (
    <button className={cn(base, VARIANTS[variant], SIZES[size], className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}

export function ButtonLink({
  variant = "lime",
  size = "md",
  arrow,
  className,
  children,
  href,
  ...rest
}: Common & { href: string } & Omit<ComponentProps<"a">, "children" | "href">) {
  const external = /^https?:|^mailto:/.test(href);
  const cls = cn(base, VARIANTS[variant], SIZES[size], className);
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        <Inner arrow={arrow}>{children}</Inner>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}
