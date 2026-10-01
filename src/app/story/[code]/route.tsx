import { ImageResponse } from "next/og";
import { formatNumber } from "@/lib/cn";
import { Blob, C, OgLogo, OgTicket, ogFonts } from "@/lib/og";
import { SAMPLE_INVITERS } from "@/lib/sample-data";
import { SITE, SPOTS_PER_INVITE } from "@/lib/site";

/**
 * 1080×1920 Instagram story image for a referral code.
 * Optional ?n=2784 lets the client pass the user's current number until the backend can look it up.
 */
export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const n = Number(new URL(req.url).searchParams.get("n"));
  const inv = SAMPLE_INVITERS[code.toLowerCase()];
  const number = Number.isFinite(n) && n > 0 ? n : inv?.number;
  const num = number ? `#${formatNumber(number)}` : "#????";
  const sub = inv ? `${inv.name} · ${inv.craft}, ${inv.city}` : "Sanji · every kind of artist";
  const link = `${SITE.shortHost}/r/${code}`;
  const fonts = await ogFonts(`I just got myspot in line.No algorithm. Ever.Join with my link and we both move up ${SPOTS_PER_INVITE} spots👇${sub}${link}SANJI MY NUMBER`);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          background: `linear-gradient(180deg, #2A1B6B 0%, ${C.ink} 100%)`,
          color: C.paper,
          overflow: "hidden",
        }}
      >
        <Blob color={C.violet} size={1300} x={-500} y={-400} opacity={0.8} />
        <Blob color={C.coral} size={1000} x={500} y={1100} opacity={0.5} />
        <div style={{ position: "absolute", left: 80, top: 120, display: "flex" }}>
          <OgLogo size={64} />
        </div>
        <div style={{ position: "absolute", left: 80, top: 280, display: "flex", flexDirection: "column", fontFamily: "Bricolage", fontSize: 120, lineHeight: 0.92, letterSpacing: -5 }}>
          <span>I just got my</span>
          <span style={{ display: "flex", alignItems: "baseline" }}>
            spot&nbsp;<span style={{ fontFamily: "InstrumentSerif", fontSize: 142, color: C.lime }}>in line.</span>
          </span>
        </div>
        <div style={{ position: "absolute", left: 230, top: 640, display: "flex", transform: "rotate(-6deg)" }}>
          <OgTicket width={620} num={num} sub={sub} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 640,
            top: 560,
            display: "flex",
            background: C.pink,
            color: C.ink,
            borderRadius: 999,
            padding: "16px 28px",
            fontFamily: "Bricolage",
            fontSize: 40,
            transform: "rotate(8deg)",
          }}
        >
          No algorithm. Ever.
        </div>
        <div style={{ position: "absolute", left: 90, top: 1540, width: 900, display: "flex", justifyContent: "center", textAlign: "center", fontFamily: "InstrumentSans", fontSize: 40, lineHeight: 1.3 }}>
          Join with my link and we both move up {SPOTS_PER_INVITE} spots ↓
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 1700,
            width: 1080,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", border: "3px dashed rgba(245,243,238,0.6)", borderRadius: 999, padding: "24px 40px", fontFamily: "GeistMono", fontSize: 36 }}>
            {link}
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1920,
      fonts,
      headers: { "Content-Disposition": `inline; filename="sanji-${code}.png"`, "Cache-Control": "public, max-age=3600" },
    },
  );
}
