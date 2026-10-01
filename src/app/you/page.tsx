import type { Metadata } from "next";
import { Suspense } from "react";
import { SlimFooter } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { YouDashboard } from "@/components/you/YouDashboard";

export const metadata: Metadata = {
  title: "You're in",
  robots: { index: false },
};

export default function YouPage() {
  return (
    <>
      <Nav minimal right={<span className="hidden font-mono text-xs text-muted sm:inline">Your spot</span>} />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-[70vh]" />}>
          <YouDashboard />
        </Suspense>
      </main>
      <SlimFooter note="Didn't get the email? Check spam." />
    </>
  );
}
