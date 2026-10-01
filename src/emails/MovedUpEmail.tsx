import { Section, Text } from "@react-email/components";
import { E, Header, PillButton, Shell, mono } from "./shared";

export const subject = (friend: string) => `▲ 500 spots. ${friend} joined with your link.`;

export default function MovedUpEmail({
  friend = "Leela S.",
  friendMeta = "Dancer, Chennai",
  from = "#2,784",
  to = "#2,284",
  invites = 1,
  shareUrl = "https://sanji.in/you",
}: {
  friend?: string;
  friendMeta?: string;
  from?: string;
  to?: string;
  invites?: number;
  shareUrl?: string;
}) {
  const toHandle = Math.max(0, 5 - invites);
  return (
    <Shell
      preview={`You're now ${to}. ${invites >= 1 ? "First Wave is yours." : "One more and First Wave is yours."}`}
      footer="You get one of these when someone joins with your link. Too many? Switch to a weekly digest."
    >
      <Header tag="You moved up" />
      <Section style={{ padding: "44px", background: E.violet, backgroundImage: `linear-gradient(180deg, ${E.violet}, ${E.ink})` }}>
        <Text style={{ display: "inline-block", background: "rgba(9,9,11,0.5)", borderRadius: 999, padding: "8px 16px", fontSize: 14, color: E.paper, margin: 0 }}>
          {friend} · {friendMeta} just joined
        </Text>
        <Text style={{ margin: "24px 0 0", lineHeight: 1 }}>
          <span style={{ fontFamily: E.display, fontWeight: 800, fontSize: 44, color: "rgba(245,243,238,0.35)", letterSpacing: "-0.04em" }}>{from}</span>
          <span style={{ fontSize: 30, color: "rgba(245,243,238,0.5)", padding: "0 14px" }}>→</span>
          <span style={{ fontFamily: E.display, fontWeight: 800, fontSize: 96, color: E.lime, letterSpacing: "-0.05em" }}>{to}</span>
        </Text>
        <Text style={{ fontSize: 17, lineHeight: 1.55, color: "rgba(245,243,238,0.8)", margin: "14px 0 0", maxWidth: 480 }}>
          {friend.split(" ")[0]} joined through your link, so you jumped 500 spots. Nice taste in friends.
        </Text>
      </Section>
      <Section style={{ padding: "36px 44px" }}>
        <table width="100%" cellPadding={0} cellSpacing={0} role="presentation">
          <tbody>
            <tr>
              <td style={{ fontFamily: E.display, fontWeight: 700, fontSize: 22, color: E.paper }}>
                {invites >= 1 ? "First Wave pass unlocked" : "Next: First Wave pass"}
              </td>
              <td align="right" style={mono(E.lime)}>
                {invites >= 1 ? "✓ 1 of 1" : `${invites} of 1`}
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ background: E.surface2, borderRadius: 6, height: 12, marginTop: 14 }}>
          <div style={{ background: E.lime, borderRadius: 6, height: 12, width: `${Math.min(100, (invites / 5) * 100)}%` }} />
        </div>
        <Text style={{ fontSize: 15, color: E.muted, margin: "10px 0 26px" }}>
          {toHandle > 0 ? `${toHandle} more invite${toHandle > 1 ? "s" : ""} to reserve your @handle.` : "Your @handle is reserved."}
        </Text>
        <PillButton href={shareUrl}>Share my link again →</PillButton>
      </Section>
    </Shell>
  );
}
