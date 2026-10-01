import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { CityChapters, CountdownBand, FirstWorksWall, LineGoals } from "@/components/landing/Addons";
import { Doors } from "@/components/landing/Doors";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LeaderboardPreview } from "@/components/landing/LeaderboardPreview";
import { Manifesto } from "@/components/landing/Manifesto";
import { Rewards } from "@/components/landing/Rewards";
import { Tapes } from "@/components/landing/Tapes";
import { BETA_DATE, FEATURES, SPOTS_PER_INVITE } from "@/lib/site";

export default function Home() {
  return (
    <>
      <AnnouncementBar>Preregistration is live — every friend you bring moves you {SPOTS_PER_INVITE} spots up</AnnouncementBar>
      <Nav />
      <main>
        <Hero />
        <Tapes />
        <Manifesto />
        <HowItWorks />
        {FEATURES.countdown && BETA_DATE && <CountdownBand date={BETA_DATE} />}
        <Rewards />
        {FEATURES.firstWorksWall && <FirstWorksWall />}
        <LeaderboardPreview />
        {FEATURES.lineGoals && <LineGoals />}
        <Doors />
        {FEATURES.cityChapters && <CityChapters />}
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
