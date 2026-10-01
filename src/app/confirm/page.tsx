"use client";

import { useEffect, useState } from "react";
import { Confetti } from "@/components/fx/Confetti";
import { SlimFooter } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { ButtonLink } from "@/components/ui/Button";
import { Glow } from "@/components/ui/bits";
import { confirmEmail, type Me } from "@/lib/api";
import { formatNumber } from "@/lib/cn";

export default function ConfirmPage() {
  const [me, setMe] = useState<Me | null | undefined>(undefined);

  useEffect(() => {
    // TODO(backend): read the confirmation token from the URL and verify it server-side.
    confirmEmail().then(setMe);
  }, []);

  return (
    <>
      <Nav minimal />
      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden py-24 text-center">
        <Glow className="-top-20 left-1/2 size-[560px] -translate-x-1/2 bg-lime/20" />
        {me === undefined && (
          <p className="inline-flex items-center gap-3 font-mono text-sm text-muted">
            <span className="size-4 animate-spin rounded-full border-2 border-lime border-r-transparent" /> Locking your spot…
          </p>
        )}
        {me === null && (
          <div className="relative container-x">
            <p className="eyebrow text-coral">Link not recognised</p>
            <h1 className="display mt-5 text-[clamp(52px,8vw,96px)]">
              Let&apos;s try <em className="accent text-coral">that again.</em>
            </h1>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/spot" size="lg">
                Check my spot
              </ButtonLink>
            </div>
          </div>
        )}
        {me && (
          <>
            <Confetti count={70} height={520} />
            <div className="relative container-x flex flex-col items-center">
              <p className="inline-flex rounded-full bg-lime px-4 py-2 font-mono text-xs font-medium tracking-[0.08em] text-ink">✓ EMAIL CONFIRMED</p>
              <h1 className="display mt-7 text-[clamp(60px,10vw,128px)]">
                Spot <em className="accent text-lime">locked.</em>
              </h1>
              <p className="mt-5 max-w-[520px] text-base text-muted md:text-xl">
                You&apos;re #{formatNumber(me.position)}. From now on, every friend who joins with your link moves you up.
              </p>
              <ButtonLink href="/you" size="lg" arrow className="mt-9">
                See my spot
              </ButtonLink>
            </div>
          </>
        )}
      </main>
      <SlimFooter />
    </>
  );
}
