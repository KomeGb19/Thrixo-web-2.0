// app/opengraph-image.tsx
// Generates the 1200x630 image shown when your link is shared on WhatsApp, X, LinkedIn, etc.
import { ImageResponse } from "next/og";

export const alt = "Thrixo Agency: Building tools of the future";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Replace with your real brand colours (your --ink and --lime values).
const INK = "#0a0a0a";
const LIME = "#c8f31d";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: INK,
        color: "#ffffff",
        padding: 72,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background: LIME,
            color: INK,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            fontWeight: 800,
          }}
        >
          T
        </div>
        <div style={{ fontSize: 34, fontWeight: 700 }}>Thrixo Agency</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          Building tools
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: LIME,
          }}
        >
          of the future.
        </div>
      </div>

      <div style={{ fontSize: 28, color: "#a3a3a3" }}>
        Web · Brand · Film · AI content — Lagos, Nigeria
      </div>
    </div>,
    size,
  );
}
