import type { Metadata } from "next";
import { SlimFooter } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { SpotFlow } from "@/components/spot/SpotFlow";
import { Glow } from "@/components/ui/bits";

export const metadata: Metadata = {
  title: "Check my spot",
  description: "See your number in line, your invites and your passes.",
};

export default function SpotPage() {
  return (
    <>
      <Nav />
      <main className="relative flex flex-1 items-center overflow-hidden py-16 md:py-24">
        <Glow className="top-20 -left-52 size-[700px] bg-violet/40" />
        <Glow className="right-0 bottom-0 size-[420px] bg-lime/15" />
        <div className="relative container-x">
          <SpotFlow />
        </div>
      </main>
      <SlimFooter />
    </>
  );
}
