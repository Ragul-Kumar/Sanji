import { Section, Text } from "@react-email/components";
import { E, PillButton, Shell, mono } from "./shared";

export const subject = (name: string) => `Your door is open. Walk in, ${name}.`;

export default function DoorOpenEmail({ name = "Anjali", handle = "anjali", url = "https://sanji.in" }: { name?: string; handle?: string; url?: string }) {
  return (
    <Shell
      preview="First Wave is live. Your spot, your @handle, your work."
      footer="You're receiving this because you're in Sanji's First Wave. Wave 2 opens later for everyone behind you."
    >
      <Section style={{ padding: "56px 44px", background: E.lime, textAlign: "center" }}>
        <Text style={{ fontFamily: E.display, fontWeight: 800, fontSize: 30, letterSpacing: "-0.05em", color: E.ink, margin: 0 }}>sanji.</Text>
        <Text style={mono(E.ink, { marginTop: 28, fontSize: 12 })}>First Wave · Day one</Text>
        <Text style={{ fontFamily: E.display, fontWeight: 800, fontSize: 84, lineHeight: 0.9, letterSpacing: "-0.05em", color: E.ink, margin: "12px 0 0" }}>
          Your door
          <br />
          <span style={{ fontFamily: E.serif, fontStyle: "italic", fontWeight: 400 }}>is open.</span>
        </Text>
        <Text style={{ fontSize: 17, lineHeight: 1.55, color: "rgba(9,9,11,0.75)", margin: "18px auto 28px", maxWidth: 440 }}>
          You stood near the front, {name}, so you&apos;re in before everyone else. Sanji is live for the First Wave today.
        </Text>
        <PillButton href={url} bg={E.ink} color={E.lime}>
          Walk in →
        </PillButton>
      </Section>
      <Section style={{ padding: "36px 44px" }}>
        <Text style={mono(E.lime)}>Your first 10 minutes</Text>
        {[
          ["1", "Claim your @handle", `sanji.in/@${handle} is held for you.`],
          ["2", "Put up three works", "Your profile is your portfolio. Start with your best."],
          ["3", "Pick your crafts", "So the right people find you, sorted by art form."],
        ].map(([n, t, b]) => (
          <table key={n} width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={{ borderTop: `1px solid ${E.line}`, marginTop: n === "1" ? 16 : 0 }}>
            <tbody>
              <tr>
                <td width="52" style={{ padding: "14px 0", verticalAlign: "top" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 18, background: E.lime, color: E.ink, textAlign: "center", lineHeight: "36px", fontFamily: E.display, fontWeight: 700, fontSize: 16 }}>
                    {n}
                  </div>
                </td>
                <td style={{ padding: "14px 0" }}>
                  <Text style={{ fontFamily: E.display, fontWeight: 700, fontSize: 19, color: E.paper, margin: 0 }}>{t}</Text>
                  <Text style={{ fontSize: 14, color: E.muted, margin: "2px 0 0" }}>{b}</Text>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </Section>
    </Shell>
  );
}
