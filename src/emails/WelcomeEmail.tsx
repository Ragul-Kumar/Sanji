import { Section, Text } from "@react-email/components";
import { E, Header, PillButton, Shell, mono } from "./shared";

export const subject = (n: string) => `You're ${n}. Confirm to lock it in.`;

export default function WelcomeEmail({
  name = "Anjali",
  number = "#2,784",
  confirmUrl = "https://sanji.in/confirm?token=demo",
  link = "sanji.in/r/anjali",
}: {
  name?: string;
  number?: string;
  confirmUrl?: string;
  link?: string;
}) {
  return (
    <Shell
      preview="One tap and your spot is yours. Then bring your people."
      footer="You're getting this because you joined the Sanji waitlist. Didn't sign up? Ignore this and nothing happens."
    >
      <Header tag="Welcome" />
      <Section style={{ padding: "48px 44px 40px", textAlign: "center" }}>
        <Text style={{ fontFamily: E.serif, fontStyle: "italic", fontSize: 24, color: E.muted, margin: 0 }}>Your number in line</Text>
        <Text style={{ fontFamily: E.display, fontWeight: 800, fontSize: 112, lineHeight: 1, letterSpacing: "-0.06em", color: E.lime, margin: "6px 0 0" }}>
          {number}
        </Text>
        <Text style={{ fontSize: 17, lineHeight: 1.55, color: E.muted, margin: "20px auto 28px", maxWidth: 470 }}>
          Welcome to Sanji, {name}. One last step: confirm your email so your spot is locked and your invites start counting.
        </Text>
        <PillButton href={confirmUrl}>Confirm my email →</PillButton>
        <Text style={mono(E.muted, { marginTop: 12, textTransform: "none", letterSpacing: "0.04em" })}>Link expires in 48 hours.</Text>
      </Section>
      <Section style={{ background: E.surface, padding: "36px 44px" }}>
        <Text style={mono(E.lime)}>Then, move up</Text>
        <Text style={{ fontFamily: E.display, fontWeight: 700, fontSize: 26, lineHeight: 1.15, letterSpacing: "-0.02em", color: E.paper, margin: "10px 0 18px" }}>
          Every friend who joins with your link moves you 500 spots up.
        </Text>
        <table width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={{ background: E.ink, border: `1px solid ${E.line}`, borderRadius: 16 }}>
          <tbody>
            <tr>
              <td style={{ padding: "16px 20px", fontFamily: E.mono, fontSize: 16, color: E.paper }}>{link}</td>
              <td align="right" style={{ padding: "16px 20px", fontWeight: 600, fontSize: 15, color: E.lime }}>
                Share →
              </td>
            </tr>
          </tbody>
        </table>
        <table width="100%" cellPadding={0} cellSpacing={0} role="presentation" style={{ marginTop: 22 }}>
          <tbody>
            <tr>
              {[
                ["1 invite", "First Wave", `linear-gradient(135deg, ${E.lime}, ${E.lime})`, E.lime],
                ["5 invites", "@yourname", `linear-gradient(135deg, ${E.pink}, ${E.sky})`, E.pink],
                ["Top 100", "Founding", `linear-gradient(135deg, ${E.coral}, #FFB36B)`, E.coral],
              ].map(([a, b, g, solid], i) => (
                <td key={a} width="33%" style={{ paddingLeft: i ? 5 : 0, paddingRight: i < 2 ? 5 : 0 }}>
                  <div style={{ background: solid, backgroundImage: g, borderRadius: 16, padding: 16 }}>
                    <Text style={mono(E.ink, { fontSize: 10 })}>{a}</Text>
                    <Text style={{ fontFamily: E.display, fontWeight: 700, fontSize: 19, color: E.ink, margin: "6px 0 0" }}>{b}</Text>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </Section>
    </Shell>
  );
}
