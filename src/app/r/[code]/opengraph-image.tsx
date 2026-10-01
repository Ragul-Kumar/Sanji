import { ImageResponse } from "next/og";
import { formatNumber } from "@/lib/cn";
import { Blob, C, OgLogo, OgTicket, ogFonts } from "@/lib/og";
import { SAMPLE_INVITERS } from "@/lib/sample-data";
import { SITE, SPOTS_PER_INVITE } from "@/lib/site";

export const alt = "You were invited to Sanji";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  // TODO(backend): look up the real inviter + number for this code.
  const inv = SAMPLE_INVITERS[code.toLowerCase()];
  const num = inv ? `#${formatNumber(inv.number)}` : "#????";
  const lead = inv ? `I'm ${num} in line` : "I'm in line";
  const link = `${SITE.shortHost}/r/${code}`;
  const sub = inv ? `${inv.name} · ${inv.craft}` : "Your number in line";
  const fonts = await ogFonts(`${lead}for Sanji. Skip theline with my link.${link}We both move up ${SPOTS_PER_INVITE} spots.${sub}SANJI MY NUMBER`);

  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: C.ink, color: C.paper, overflow: "hidden" }}>
        <Blob color={C.violet} size={900} x={-400} y={120} opacity={0.7} />
        <Blob color={C.coral} size={700} x={700} y={-300} opacity={0.45} />
        <div style={{ position: "absolute", left: 64, top: 56, display: "flex" }}>
          <OgLogo />
        </div>
        <div style={{ position: "absolute", left: 64, top: 170, width: 700, display: "flex", flexDirection: "column", fontFamily: "Bricolage", fontSize: 70, lineHeight: 0.95, letterSpacing: -3 }}>
          <span>{lead}</span>
          <span>for Sanji. Skip the</span>
          <span style={{ display: "flex", alignItems: "baseline" }}>
            line with&nbsp;<span style={{ fontFamily: "InstrumentSerif", fontSize: 84, color: C.lime }}>my link.</span>
          </span>
        </div>
        <div style={{ position: "absolute", left: 64, top: 528, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", background: C.lime, color: C.ink, borderRadius: 999, padding: "10px 16px", fontFamily: "GeistMono", fontSize: 18 }}>{link}</div>
          <div style={{ display: "flex", fontFamily: "InstrumentSans", fontSize: 20, color: C.muted }}>We both move up {SPOTS_PER_INVITE} spots.</div>
        </div>
        <div style={{ position: "absolute", left: 820, top: 100, display: "flex", transform: "rotate(-8deg)" }}>
          <OgTicket width={330} num={num} sub={sub} />
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
