"use client";
import { useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

/* ───────────── constants ───────────── */
const INK = "#0d0d0d";
const PAPER = "#f3efe6";
const LIME = "var(--color-lime)";
const PAD = 24; // room around each shape for the die-cut border

type Kind =
  | "pill"
  | "kite"
  | "scallop"
  | "circle"
  | "house"
  | "battery"
  | "ticket"
  | "arrow"
  | "bubble";
type Ctx = { w: number; h: number; uid: string };

type Sticker = {
  kind: Kind;
  w: number;
  h: number;
  fill: string;
  rim?: string;
  r: number; // rotation
  x: string;
  y: string; // desktop position
  mx: string;
  my: string; // mobile position
  content: (c: Ctx) => React.ReactNode;
};

/* ───────────── shape paths ───────────── */
function shape(kind: Kind, W: number, H: number): { d: string; rw: number } {
  const bx = PAD,
    by = PAD,
    bw = W - PAD * 2,
    bh = H - PAD * 2;
  const poly = (pts: [number, number][]) =>
    "M" +
    pts
      .map(
        ([a, b]) => `${(bx + a * bw).toFixed(1)},${(by + b * bh).toFixed(1)}`,
      )
      .join("L") +
    "Z";

  switch (kind) {
    case "pill": {
      const r = bh / 2;
      return {
        rw: 6,
        d: `M${bx + r},${by}H${bx + bw - r}A${r},${r} 0 0 1 ${bx + bw - r},${by + bh}H${bx + r}A${r},${r} 0 0 1 ${bx + r},${by}Z`,
      };
    }
    case "kite":
      return {
        rw: 22,
        d: poly([
          [0.25, 0],
          [0.75, 0],
          [1, 0.5],
          [0.75, 1],
          [0.25, 1],
          [0, 0.5],
        ]),
      };
    case "house":
      return {
        rw: 22,
        d: poly([
          [0.5, 0],
          [1, 0.3],
          [1, 1],
          [0, 1],
          [0, 0.3],
        ]),
      };
    case "arrow":
      return {
        rw: 22,
        d: poly([
          [0, 0],
          [0.8, 0],
          [1, 0.5],
          [0.8, 1],
          [0, 1],
        ]),
      };
    case "circle": {
      const R = Math.min(bw, bh) / 2,
        cx = W / 2,
        cy = H / 2;
      return {
        rw: 6,
        d: `M${cx - R},${cy}a${R},${R} 0 1,0 ${2 * R},0a${R},${R} 0 1,0 ${-2 * R},0Z`,
      };
    }
    case "scallop": {
      const R = Math.min(bw, bh) / 2 - 7,
        cx = W / 2,
        cy = H / 2,
        n = 14;
      const pts: string[] = [];
      for (let i = 0; i < 280; i++) {
        const t = (i / 280) * Math.PI * 2;
        const rr = R * (1 + 0.065 * Math.cos(n * t));
        pts.push(
          `${(cx + rr * Math.cos(t)).toFixed(1)},${(cy + rr * Math.sin(t)).toFixed(1)}`,
        );
      }
      return { rw: 6, d: "M" + pts.join("L") + "Z" };
    }
    case "battery": {
      const body = bw * 0.9,
        rx = bh * 0.24,
        ny1 = by + bh * 0.3,
        ny2 = by + bh * 0.7;
      return {
        rw: 10,
        d: `M${bx + rx},${by}H${bx + body - rx}A${rx},${rx} 0 0 1 ${bx + body},${by + rx}V${by + bh - rx}A${rx},${rx} 0 0 1 ${bx + body - rx},${by + bh}H${bx + rx}A${rx},${rx} 0 0 1 ${bx},${by + bh - rx}V${by + rx}A${rx},${rx} 0 0 1 ${bx + rx},${by}Z M${bx + body - 2},${ny1}H${bx + bw}V${ny2}H${bx + body - 2}Z`,
      };
    }
    case "ticket": {
      const rr = 18,
        n = 16,
        cy = by + bh / 2;
      return {
        rw: 6,
        d: `M${bx + rr},${by}H${bx + bw - rr}A${rr},${rr} 0 0 1 ${bx + bw},${by + rr}V${cy - n}A${n},${n} 0 0 0 ${bx + bw},${cy + n}V${by + bh - rr}A${rr},${rr} 0 0 1 ${bx + bw - rr},${by + bh}H${bx + rr}A${rr},${rr} 0 0 1 ${bx},${by + bh - rr}V${cy + n}A${n},${n} 0 0 0 ${bx},${cy - n}V${by + rr}A${rr},${rr} 0 0 1 ${bx + rr},${by}Z`,
      };
    }
    case "bubble": {
      const rr = 26,
        yb = by + bh - 24;
      return {
        rw: 6,
        d: `M${bx + rr},${by}H${bx + bw - rr}A${rr},${rr} 0 0 1 ${bx + bw},${by + rr}V${yb - rr}A${rr},${rr} 0 0 1 ${bx + bw - rr},${yb}H${bx + 70}L${bx + 24},${by + bh}L${bx + 34},${yb}H${bx + rr}A${rr},${rr} 0 0 1 ${bx},${yb - rr}V${by + rr}A${rr},${rr} 0 0 1 ${bx + rr},${by}Z`,
      };
    }
  }
}

/* ───────────── tiny SVG helpers ───────────── */
function Txt({
  x,
  y,
  size,
  fill,
  anchor = "start",
  serif,
  italic,
  weight = 700,
  children,
}: {
  x: number;
  y: number;
  size: number;
  fill: string;
  anchor?: "start" | "middle" | "end";
  serif?: boolean;
  italic?: boolean;
  weight?: number;
  children: React.ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      textAnchor={anchor}
      style={{
        fill,
        fontFamily: serif
          ? "var(--font-serif), serif"
          : "var(--font-display), sans-serif",
        fontWeight: weight,
        fontStyle: italic ? "italic" : "normal",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </text>
  );
}

function Badge({
  cx,
  cy,
  r,
  emoji,
  bg = INK,
}: {
  cx: number;
  cy: number;
  r: number;
  emoji: string;
  bg?: string;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} style={{ fill: bg }} />
      <text
        x={cx}
        y={cy}
        fontSize={r * 1.05}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fill: LIME }}
      >
        {emoji}
      </text>
    </g>
  );
}

function Ring({
  uid,
  cx,
  cy,
  r,
  text,
  size,
  fill,
}: {
  uid: string;
  cx: number;
  cy: number;
  r: number;
  text: string;
  size: number;
  fill: string;
}) {
  const id = `${uid}ring`;
  return (
    <g>
      <path
        id={id}
        d={`M${cx - r},${cy}a${r},${r} 0 1,1 ${2 * r},0a${r},${r} 0 1,1 ${-2 * r},0`}
        fill="none"
      />
      <text
        fontSize={size}
        style={{
          fill,
          fontFamily: "var(--font-display), sans-serif",
          fontWeight: 700,
        }}
      >
        <textPath
          href={`#${id}`}
          textLength={2 * Math.PI * r - 4}
          lengthAdjust="spacing"
        >
          {text}
        </textPath>
      </text>
    </g>
  );
}

/* ───────────── the stickers ───────────── */
const stickers: Sticker[] = [
  {
    // 1 · pill
    kind: "pill",
    w: 340,
    h: 128,
    fill: LIME,
    r: -6,
    x: "3%",
    y: "4%",
    mx: "1%",
    my: "1%",
    content: ({ w, h }) => (
      <>
        <Txt x={50} y={h / 2 - 3} size={23} fill={INK}>
          Websites that
        </Txt>
        <Txt x={50} y={h / 2 + 26} size={23} fill={INK}>
          convert
        </Txt>
        <Badge cx={w - PAD - 44} cy={h / 2} r={25} emoji="🔄" />
      </>
    ),
  },
  {
    // 2 · circle with ring text
    kind: "circle",
    w: 250,
    h: 250,
    fill: "var(--color-brand)",
    r: 7,
    x: "27%",
    y: "2%",
    mx: "56%",
    my: "1%",
    content: ({ w, h, uid }) => (
      <>
        <Ring
          uid={uid}
          cx={w / 2}
          cy={h / 2}
          r={80}
          size={17}
          fill={INK}
          text="LAGOS → WORLD • LAGOS → WORLD • "
        />
        <circle cx={w / 2} cy={h / 2} r={42} style={{ fill: INK }} />
        <Txt
          x={w / 2}
          y={h / 2 + 20}
          size={58}
          fill={LIME}
          anchor="middle"
          serif
          italic
          weight={400}
        >
          t
        </Txt>
      </>
    ),
  },
  {
    // 3 · kite tag
    kind: "kite",
    w: 260,
    h: 200,
    fill: INK,
    r: 5,
    x: "50%",
    y: "6%",
    mx: "2%",
    my: "17%",
    content: ({ h }) => (
      <>
        <text x={110} y={h / 2 - 38} fontSize={26}>
          🎯
        </text>
        <Txt x={40} y={h / 2 + 20} size={56} fill={LIME}>
          +51.4%
        </Txt>
        <Txt x={62} y={h / 2 + 55} size={26} fill={PAPER}>
          conversion
        </Txt>
      </>
    ),
  },
  {
    // 4 · scalloped badge
    kind: "scallop",
    w: 250,
    h: 250,
    fill: "var(--color-coral)",
    r: -3,
    x: "75%",
    y: "3%",
    mx: "56%",
    my: "24%",
    content: ({ w, h, uid }) => (
      <>
        <Ring
          uid={uid}
          cx={w / 2}
          cy={h / 2}
          r={72}
          size={15}
          fill={INK}
          text="BRAND IDENTITIES • BRAND IDENTITIES • "
        />
        <Badge cx={w / 2} cy={h / 2} r={36} emoji="😍" />
      </>
    ),
  },
  {
    // 5 · house
    kind: "house",
    w: 270,
    h: 250,
    fill: "var(--color-sky)",
    r: -8,
    x: "6%",
    y: "40%",
    mx: "2%",
    my: "38%",
    content: ({ w, h }) => (
      <>
        <text x={w / 2} y={h * 0.3} fontSize={34} textAnchor="middle">
          🎬
        </text>
        <Txt x={46} y={h * 0.63} size={30} fill={INK}>
          Motion
        </Txt>
        <Txt x={46} y={h * 0.63 + 33} size={30} fill={INK}>
          with intent
        </Txt>
      </>
    ),
  },
  {
    // 6 · ticket
    kind: "ticket",
    w: 350,
    h: 136,
    fill: "#ece6d8",
    r: 4,
    x: "32%",
    y: "44%",
    mx: "41%",
    my: "46%",
    content: ({ w, h }) => (
      <>
        <Txt x={62} y={h / 2 - 4} size={25} fill={INK}>
          AI-assisted,
        </Txt>
        <Txt x={62} y={h / 2 + 28} size={25} fill={INK}>
          human-led
        </Txt>
        <Badge cx={w - PAD - 52} cy={h / 2} r={26} emoji="🚶🏽" />
      </>
    ),
  },
  {
    // 7 · arrow tag
    kind: "arrow",
    w: 360,
    h: 140,
    fill: INK,
    r: -5,
    x: "58%",
    y: "38%",
    mx: "2%",
    my: "62%",
    content: ({ w, h }) => (
      <>
        <Txt x={52} y={h / 2 - 2} size={34} fill={PAPER}>
          Ship it.
        </Txt>
        <Txt x={52} y={h / 2 + 30} size={21} fill={LIME}>
          Then improve it.
        </Txt>
        <text
          x={w - PAD - 48}
          y={h / 2}
          fontSize={28}
          textAnchor="middle"
          dominantBaseline="central"
        >
          🚀
        </text>
      </>
    ),
  },
  {
    // 8 · battery
    kind: "battery",
    w: 360,
    h: 150,
    fill: LIME,
    rim: INK,
    r: 6,
    x: "8%",
    y: "72%",
    mx: "38%",
    my: "70%",
    content: ({ w, h }) => (
      <>
        <Txt x={56} y={h / 2 - 2} size={27} fill={INK}>
          100+ tools
        </Txt>
        <Txt x={56} y={h / 2 + 30} size={27} fill={INK}>
          connected
        </Txt>
        <Badge cx={PAD + 281 - 40} cy={h / 2} r={27} emoji={"⚡\uFE0F"} />
      </>
    ),
  },
  {
    // 9 · speech bubble
    kind: "bubble",
    w: 340,
    h: 200,
    fill: "var(--color-brand-soft)",
    r: 3,
    x: "62%",
    y: "66%",
    mx: "3%",
    my: "80%",
    content: ({ w, h }) => (
      <>
        <Txt x={52} y={h / 2 - 14} size={28} fill={INK}>
          Systems that
        </Txt>
        <Txt x={52} y={h / 2 + 20} size={28} fill={INK}>
          run themselves
        </Txt>
        <text x={w - PAD - 30} y={h / 2 - 36} fontSize={28} textAnchor="middle">
          🤖
        </text>
      </>
    ),
  },
];

/* ───────────── one sticker: border + colour + paper texture ───────────── */
function StickerArt({ s }: { s: Sticker }) {
  const uid = useId().replace(/:/g, "");
  const { w: W, h: H } = s;
  const { d, rw } = shape(s.kind, W, H);
  const ow = rw + 18; // die-cut border thickness
  const mask = `url(#${uid}m)`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden
      className="block size-full overflow-visible [filter:drop-shadow(0_5px_0_rgba(0,0,0,0.13))_drop-shadow(0_14px_14px_rgba(0,0,0,0.2))]"
    >
      <defs>
        <mask
          id={`${uid}m`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={W}
          height={H}
        >
          <path
            d={d}
            fill="#fff"
            stroke="#fff"
            strokeWidth={ow}
            strokeLinejoin="round"
          />
        </mask>
      </defs>

      {/* white die-cut edge */}
      <path
        d={d}
        fill="url(#thx-edge)"
        stroke="url(#thx-edge)"
        strokeWidth={ow}
        strokeLinejoin="round"
      />
      {/* sticker colour (stroke rounds the corners) */}
      <path
        d={d}
        strokeWidth={rw}
        strokeLinejoin="round"
        style={{ fill: s.fill, stroke: s.rim ?? s.fill }}
      />

      {s.content({ w: W, h: H, uid })}

      {/* paper texture, each layer clipped to the sticker outline */}
      <rect
        width={W}
        height={H}
        mask={mask}
        filter="url(#thx-crumple)"
        opacity={0.65}
        style={{ mixBlendMode: "multiply" }}
      />
      <rect
        width={W}
        height={H}
        mask={mask}
        filter="url(#thx-grain)"
        opacity={0.5}
        style={{ mixBlendMode: "overlay" }}
      />
      <rect
        width={W}
        height={H}
        mask={mask}
        fill="url(#thx-gloss)"
        style={{ mixBlendMode: "soft-light" }}
      />
    </svg>
  );
}

/* shared filter + gradient defs, rendered once */
function PaperDefs() {
  return (
    <svg
      width="0"
      height="0"
      className="pointer-events-none absolute"
      aria-hidden
    >
      <defs>
        {/* crumpled-paper lighting */}
        <filter
          id="thx-crumple"
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035 0.05"
            numOctaves="3"
            seed="4"
            result="n"
          />
          <feDiffuseLighting
            in="n"
            lightingColor="#ffffff"
            surfaceScale="2.6"
            diffuseConstant="1.15"
          >
            <feDistantLight azimuth="225" elevation="60" />
          </feDiffuseLighting>
        </filter>
        {/* fine paper fibre grain */}
        <filter
          id="thx-grain"
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="9"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        {/* silvery die-cut edge */}
        <linearGradient id="thx-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#d8d8d2" />
          <stop offset="1" stopColor="#fbfbf8" />
        </linearGradient>
        {/* glossy sheen */}
        <linearGradient id="thx-gloss" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.28" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ───────────── the wall ───────────── */
export function DraggableWall() {
  const ref = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0);
  const [moves, setMoves] = useState(0);

  return (
    <div>
      <PaperDefs />
      <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
        <span>The wall · {stickers.length} live, 0 regrets</span>
        <span>Dragged: {moves}</span>
      </div>
      <div
        ref={ref}
        className="relative h-[640px] overflow-hidden rounded-[1.5rem] border border-ink/15 bg-paper-2 md:h-[680px] md:rounded-[2rem]"
        data-cursor="Drag"
      >
        <div className="dots pointer-events-none absolute inset-0 text-ink/15" />
        <p className="pointer-events-none absolute inset-0 grid place-items-center text-center font-serif text-3xl italic text-ink/10 md:text-7xl">
          Drag anything.
          <br />
          Nobody&apos;s keeping score.
        </p>

        {stickers.map((s, i) => (
          <motion.div
            key={`${key}-${i}`}
            drag
            dragConstraints={ref}
            dragElastic={0.15}
            dragMomentum
            whileDrag={{ scale: 1.08, rotate: 0, zIndex: 50 }}
            whileHover={{ scale: 1.04 }}
            onDragEnd={() => setMoves((m) => m + 1)}
            initial={{ opacity: 0, scale: 0.6, rotate: s.r }}
            whileInView={{ opacity: 1, scale: 1, rotate: s.r }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.06,
              type: "spring",
              stiffness: 260,
              damping: 18,
            }}
            className="absolute left-(--mx) top-(--my) w-(--mw) cursor-grab touch-none select-none active:cursor-grabbing md:left-(--lx) md:top-(--ly) md:w-(--w)"
            style={
              {
                "--mx": s.mx,
                "--my": s.my,
                "--lx": s.x,
                "--ly": s.y,
                "--w": `${s.w}px`,
                "--mw": `${Math.round(s.w * 0.56)}px`,
                aspectRatio: `${s.w} / ${s.h}`,
              } as React.CSSProperties
            }
          >
            <StickerArt s={s} />
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setKey((k) => k + 1);
            setMoves(0);
          }}
        >
          Tidy up
        </Button>
      </div>
    </div>
  );
}
