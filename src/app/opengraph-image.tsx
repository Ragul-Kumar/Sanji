import { ImageResponse } from "next/og";
import { Blob, C, OgLogo, ogFonts } from "@/lib/og";

export const alt = "Sanji — Skip the algorithm. Join the line.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TILES = [
  { from: C.coral, to: C.pink, x: 760, y: 120, r: -10, label: "Painting" },
  { from: C.sky, to: C.violet, x: 880, y: 160, r: 4, label: "Photography" },
  { from: C.violet, to: "#1C1C21", x: 990, y: 110, r: 12, label: "Music" },
];

export default async function Image() {
  const fonts = await ogFonts("Skip the algorithm.Join the line.The art platform with no algorithm. Preregistration open. Beta late 2026.sanji.inPaintingPhotographyMusic");
  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: C.ink, color: C.paper, overflow: "hidden" }}>
        <Blob color={C.violet} size={900} x={-420} y={60} opacity={0.75} />
        <Blob color={C.lime} size={600} x={720} y={300} opacity={0.3} />
        {TILES.map((t) => (
          <div
            key={t.label}
            style={{
              position: "absolute",
              left: t.x,
              top: t.y,
              width: 200,
              height: 270,
              borderRadius: 26,
              background: `linear-gradient(135deg, ${t.from}, ${t.to})`,
              transform: `rotate(${t.r}deg)`,
              display: "flex",
              alignItems: "flex-end",
              padding: 14,
            }}
          >
            <div style={{ display: "flex", background: "rgba(9,9,11,0.85)", borderRadius: 999, padding: "7px 12px", fontFamily: "InstrumentSans", fontSize: 13 }}>
              {t.label}
            </div>
          </div>
        ))}
        <div style={{ position: "absolute", left: 64, top: 56, display: "flex" }}>
          <OgLogo />
        </div>
        <div style={{ position: "absolute", left: 64, top: 190, display: "flex", flexDirection: "column", fontFamily: "Bricolage", fontSize: 84, lineHeight: 0.92, letterSpacing: -4 }}>
          <span>Skip the algorithm.</span>
          <span style={{ display: "flex", alignItems: "baseline" }}>
            Join the&nbsp;<span style={{ fontFamily: "InstrumentSerif", fontSize: 100, color: C.lime, letterSpacing: -1 }}>line.</span>
          </span>
        </div>
        <div style={{ position: "absolute", left: 64, top: 420, width: 620, display: "flex", fontFamily: "InstrumentSans", fontSize: 22, color: C.muted, lineHeight: 1.4 }}>
          The art platform with no algorithm. Preregistration open. Beta late 2026.
        </div>
        <div style={{ position: "absolute", left: 64, top: 530, display: "flex", background: C.lime, color: C.ink, borderRadius: 999, padding: "10px 18px", fontFamily: "GeistMono", fontSize: 18 }}>
          sanji.in
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
