import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE, SPOTS_PER_INVITE } from "@/lib/site";

export const metadata: Metadata = { title: "Terms" };

// DRAFT copy. Needs legal review before launch.
export default function TermsPage() {
  return (
    <LegalPage
      active="terms"
      title="The rules of"
      accent="the line."
      intro="Joining the waitlist is free. These are the few rules that keep the line fair for everyone."
      sections={[
        { title: "One person, one spot", body: "Each person may hold one spot. Multiple accounts for the same person get merged or removed." },
        {
          title: "How invites count",
          body: `Each friend who joins with your link and confirms their email moves you up ${SPOTS_PER_INVITE} spots. Unconfirmed or fake signups don't count.`,
        },
        { title: "No gaming", body: "Bots, throwaway emails, bought signups and self-referrals are removed, along with the spots they earned." },
        { title: "Passes", body: "Passes are rewards for the beta. They have no cash value and can't be transferred or sold." },
        { title: "Changes", body: "Waves, dates and rewards may change as we build. If something you earned changes, we'll tell you first by email." },
        { title: "Who you're dealing with", body: `Sanji is built and run by ${SITE.company}, ${SITE.city}, India.` },
      ]}
    />
  );
}
