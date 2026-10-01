"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SlimFooter } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { ButtonLink } from "@/components/ui/Button";
import { verifyMagicLink } from "@/lib/api";

export default function VerifyPage() {
  const router = useRouter();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // TODO(backend): exchange the token from the URL for a session.
    verifyMagicLink().then((me) => {
      if (me) router.replace("/you");
      else setFailed(true);
    });
  }, [router]);

  return (
    <>
      <Nav minimal />
      <main className="container-x flex flex-1 flex-col items-center justify-center py-24 text-center">
        {failed ? (
          <>
            <p className="eyebrow text-coral">Link expired or unknown</p>
            <h1 className="display mt-5 text-[clamp(52px,8vw,96px)]">
              That link <em className="accent text-coral">didn&apos;t work.</em>
            </h1>
            <p className="mt-5 max-w-[460px] text-muted md:text-lg">Links last 48 hours and work once. Get a fresh one, or take a number if you&apos;re new.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/spot" size="lg">
                Send a new link
              </ButtonLink>
              <ButtonLink href="/#join" variant="outline" size="lg">
                Get my number
              </ButtonLink>
            </div>
          </>
        ) : (
          <p className="inline-flex items-center gap-3 font-mono text-sm text-muted">
            <span className="size-4 animate-spin rounded-full border-2 border-lime border-r-transparent" /> Signing you in…
          </p>
        )}
      </main>
      <SlimFooter />
    </>
  );
}
