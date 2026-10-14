"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const text = "We believe *ideas* start as nonsense, then become *systems*. Pretty is easy. We care about the kind of work that is *beautiful*, loads in a blink, and keeps *running* long after launch day. That's why a *brand*, a *website* and a *workflow* should feel like one machine, not three vendors.";

function Word({ w, hl, range, p }: { w: string; hl: boolean; range: [number, number]; p: MotionValue<number> }) {
  const o = useTransform(p, range, [0.14, 1]);
  const scaleX = useTransform(p, range, [0, 1]);
  return (
    <span className="relative mr-[0.28em] inline-block">
      {hl && <motion.span style={{ scaleX }} className="absolute inset-x-0 bottom-[0.08em] top-[0.5em] -z-0 origin-left bg-lime" />}
      <motion.span style={{ opacity: o }} className="relative">{w}</motion.span>
    </span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const tokens = text.split(" ").map((raw) => ({ hl: raw.startsWith("*"), w: raw.replace(/\*/g, "") }));
  return (
    <section className="px-5 py-32 md:px-10 md:py-48">
      <div className="mx-auto max-w-[1300px]">
        <p className="mb-10 font-mono text-xs uppercase tracking-[0.25em] text-ink/50">Things we believe to be true</p>
        <div ref={ref} className="text-[clamp(2rem,5.2vw,5rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
          {tokens.map((t, i) => (
            <Word key={i} w={t.w} hl={t.hl} p={scrollYProgress} range={[i / tokens.length, Math.min(1, (i + 3) / tokens.length)]} />
          ))}
        </div>
      </div>
    </section>
  );
}
