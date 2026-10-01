import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy" };

// DRAFT copy. Every promise here must be checked by a lawyer and be true in the backend before launch.
export default function PrivacyPage() {
  return (
    <LegalPage
      active="privacy"
      title="Privacy, in"
      accent="plain words."
      intro="Short version: we keep the minimum to hold your spot, we never sell it, and you can delete it any time."
      sections={[
        { title: "What we collect", body: "Your email, the role you pick, and who invited you. If you add a city or craft, that too. Nothing else." },
        { title: "Why we keep it", body: "To hold your spot, count your invites fairly, and email you about your place in line and the beta." },
        { title: "What we never do", body: "Sell your data. Share your email with brands. Use it for advertising." },
        { title: "How long", body: "Until the beta opens, or until you leave the line. Then it moves to your account or gets deleted." },
        { title: "Your controls", body: "Leave the line, download your data or delete everything from the link in any email. One click." },
        { title: "Talk to a human", body: `Questions go to a real person at ${SITE.company}, ${SITE.city}: hello@sanji.in.` },
      ]}
    />
  );
}
