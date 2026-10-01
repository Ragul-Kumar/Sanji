import { Body, Container, Head, Html, Preview, Section, Text } from "@react-email/components";
import type { CSSProperties, ReactNode } from "react";

export const E = {
  ink: "#09090B",
  surface: "#131316",
  surface2: "#1C1C21",
  line: "#2B2B33",
  paper: "#F5F3EE",
  muted: "#8F8D98",
  lime: "#C8FF2E",
  violet: "#7C5CFF",
  coral: "#FF5B3A",
  pink: "#FF9EE6",
  sky: "#6FD3FF",
  display: "'Bricolage Grotesque', 'Helvetica Neue', Arial, sans-serif",
  serif: "'Instrument Serif', Georgia, serif",
  sans: "'Instrument Sans', 'Helvetica Neue', Arial, sans-serif",
  mono: "'Geist Mono', 'SFMono-Regular', Menlo, monospace",
};

export const mono = (color: string, extra: CSSProperties = {}): CSSProperties => ({
  fontFamily: E.mono,
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color,
  margin: 0,
  ...extra,
});

export function Shell({ preview, children, footer }: { preview: string; children: ReactNode; footer: string }) {
  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="dark" />
        <meta name="supported-color-schemes" content="dark" />
        {/* Email HTML, not a Next page: the font link is intentional. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Geist+Mono:wght@500&family=Instrument+Sans:wght@400;600&family=Instrument+Serif:ital@1&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Preview>{preview}</Preview>
      <Body style={{ background: E.surface2, margin: 0, padding: "32px 0", fontFamily: E.sans }}>
        <Container style={{ width: 600, maxWidth: "100%", background: E.ink, borderRadius: 24, overflow: "hidden" }}>
          {children}
          <Section style={{ background: E.surface, padding: "28px 44px 32px" }}>
            <Text style={{ fontSize: 13, color: E.muted, lineHeight: 1.55, margin: 0 }}>{footer}</Text>
            <Text style={mono(E.muted, { marginTop: 14 })}>Aaydha Tech · aaydhatech.in · Chennai · Unsubscribe · Privacy</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function Header({ tag }: { tag: string }) {
  return (
    <Section style={{ padding: "28px 44px", borderBottom: `1px solid ${E.line}` }}>
      <table width="100%" cellPadding={0} cellSpacing={0} role="presentation">
        <tbody>
          <tr>
            <td style={{ fontFamily: E.display, fontWeight: 800, fontSize: 26, letterSpacing: "-0.05em", color: E.paper }}>
              sanji<span style={{ color: E.lime }}>.</span>
            </td>
            <td align="right" style={mono(E.lime)}>
              {tag}
            </td>
          </tr>
        </tbody>
      </table>
    </Section>
  );
}

export function PillButton({ href, children, bg = E.lime, color = E.ink }: { href: string; children: ReactNode; bg?: string; color?: string }) {
  return (
    <a
      href={href}
      style={{
        display: "block",
        background: bg,
        color,
        textAlign: "center",
        borderRadius: 999,
        padding: "20px 24px",
        fontFamily: E.sans,
        fontWeight: 600,
        fontSize: 18,
        textDecoration: "none",
      }}
    >
      {children}
    </a>
  );
}
