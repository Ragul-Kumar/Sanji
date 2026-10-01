// Helpers for next/og ImageResponse (satori: flexbox + inline styles only).

type FontDef = { name: string; data: ArrayBuffer; weight: 400 | 500 | 600 | 700 | 800; style: "normal" | "italic" };

async function loadGoogleFont(query: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${query}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!src) throw new Error("font not found");
  const res = await fetch(src[1]);
  if (!res.ok) throw new Error("font fetch failed");
  return res.arrayBuffer();
}

/** Loads Bricolage ExtraBold, Instrument Serif Italic and Geist Mono for the given text. Falls back to default font offline. */
export async function ogFonts(text: string): Promise<FontDef[]> {
  const all = text + "0123456789#,.→↑▲✺·@ ";
  const jobs: [string, string, FontDef["weight"], FontDef["style"]][] = [
    ["Bricolage", "Bricolage+Grotesque:wght@800", 800, "normal"],
    ["InstrumentSerif", "Instrument+Serif:ital@1", 400, "italic"],
    ["GeistMono", "Geist+Mono:wght@500", 500, "normal"],
    ["InstrumentSans", "Instrument+Sans:wght@500", 500, "normal"],
  ];
  const out = await Promise.all(
    jobs.map(async ([name, q, weight, style]) => {
      try {
        return { name, data: await loadGoogleFont(q, all), weight, style } as FontDef;
      } catch {
        return null;
      }
    }),
  );
  return out.filter((f): f is FontDef => f !== null);
}

export const C = {
  ink: "#09090B",
  surface: "#131316",
  paper: "#F5F3EE",
  muted: "#8F8D98",
  lime: "#C8FF2E",
  violet: "#7C5CFF",
  coral: "#FF5B3A",
  pink: "#FF9EE6",
  sky: "#6FD3FF",
};

export function Blob({ color, size, x, y, opacity = 0.5 }: { color: string; size: number; x: number; y: number; opacity?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: size,
        background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 70%)`,
        opacity,
      }}
    />
  );
}

export function OgLogo({ size = 44, color = C.paper, dot = C.lime }: { size?: number; color?: string; dot?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: size * 0.12 }}>
      <div style={{ fontFamily: "Bricolage", fontSize: size, color, letterSpacing: -size * 0.05, lineHeight: 0.8 }}>sanji</div>
      <div style={{ width: size * 0.28, height: size * 0.28, borderRadius: size, background: dot, marginBottom: size * 0.02 }} />
    </div>
  );
}

export function OgTicket({ width, num, sub }: { width: number; num: string; sub: string }) {
  const p = width * 0.09;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width,
        height: width * 1.22,
        padding: p,
        borderRadius: width * 0.1,
        background: C.lime,
        color: C.ink,
        boxShadow: "0 30px 90px rgba(200,255,46,0.35)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "GeistMono", fontSize: width * 0.04, letterSpacing: 2 }}>
        <span>SANJI · MY NUMBER</span>
        <span style={{ opacity: 0.55 }}>2026</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "Bricolage", fontSize: width * 0.28, letterSpacing: -width * 0.016, lineHeight: 1 }}>{num}</div>
        <div style={{ fontFamily: "InstrumentSans", fontSize: width * 0.05, opacity: 0.8, marginTop: 6 }}>{sub}</div>
      </div>
      <div
        style={{
          display: "flex",
          alignSelf: "flex-start",
          background: C.ink,
          color: C.lime,
          fontFamily: "GeistMono",
          fontSize: width * 0.042,
          padding: `${width * 0.022}px ${width * 0.04}px`,
          borderRadius: 999,
        }}
      >
        ▲ 500 spots per invite
      </div>
    </div>
  );
}
