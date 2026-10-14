"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type Sticker = { t: string; cls: string; r: number; x: string; y: string };

const stickers: Sticker[] = [
  {
    t: "🔄️Websites that convert",
    cls: "bg-lime text-ink",
    r: -6,
    x: "4%",
    y: "8%",
  },
  {
    t: "🎯+51.4% conversion",
    cls: "bg-ink text-paper",
    r: 5,
    x: "34%",
    y: "4%",
  },
  {
    t: "Brand identities 😍",
    cls: "bg-coral text-ink",
    r: -3,
    x: "62%",
    y: "10%",
  },
  {
    t: "Lagos → World 🌎",
    cls: "bg-brand text-white",
    r: 7,
    x: "10%",
    y: "42%",
  },
  {
    t: "Motion with intent 🎬",
    cls: "bg-sky text-ink",
    r: -8,
    x: "40%",
    y: "38%",
  },
  {
    t: "🚶🏽AI-assisted, human-led",
    cls: "bg-paper-2 text-ink border border-ink/15",
    r: 4,
    x: "66%",
    y: "44%",
  },
  {
    t: " 🛠️100+ tools connected",
    cls: "bg-lime text-ink",
    r: 6,
    x: "6%",
    y: "72%",
  },
  {
    t: "Ship it. Then improve it. 🚀",
    cls: "bg-ink text-lime",
    r: -5,
    x: "38%",
    y: "70%",
  },
  {
    t: "Systems that run themselves 🤖",
    cls: "bg-brand-soft text-ink",
    r: 3,
    x: "64%",
    y: "74%",
  },
];

export function DraggableWall() {
  const ref = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0);
  const [moves, setMoves] = useState(0);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
        <span>The wall · {stickers.length} live, 0 regrets</span>
        <span>Dragged: {moves}</span>
      </div>
      <div
        ref={ref}
        className="relative h-[560px] overflow-hidden rounded-[2rem] border border-ink/15 bg-paper-2 md:h-[620px]"
        data-cursor="Drag"
      >
        <div className="dots pointer-events-none absolute inset-0 text-ink/15" />
        <p className="pointer-events-none absolute inset-0 grid place-items-center text-center font-serif text-4xl italic text-ink/10 md:text-7xl">
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
            whileDrag={{ scale: 1.1, rotate: 0, zIndex: 50 }}
            whileHover={{ scale: 1.05 }}
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
            className={`absolute cursor-grab select-none whitespace-nowrap rounded-full p-1 text-base font-semibold shadow-[0_8px_0_rgba(0,0,0,0.12)] active:cursor-grabbing md:text-xl bg-white`}
            style={{ left: s.x, top: s.y }}
          >
            <div className={`${s.cls} rounded-full px-5 py-3 md:px-7 md:py-4`}>
              {s.t}
            </div>
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
