"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { process } from "@/lib/data";
import { SplitText } from "@/components/fx/reveal";
import { cn } from "@/lib/utils";

function Card({ s, i }: { s: (typeof process)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  return (
    <div ref={ref} className="sticky" style={{ top: `${96 + i * 22}px` }}>
      <motion.div style={{ scale }} className={cn("grid min-h-[380px] gap-8 rounded-[2.5rem] p-8 shadow-[0_-20px_60px_rgba(0,0,0,0.08)] md:grid-cols-12 md:p-14", s.bg.includes("text-") ? s.bg : `${s.bg} text-ink`)}>
        <div className="flex flex-col justify-between md:col-span-7">
          <div className="flex items-center gap-4">
            <span className="font-serif text-7xl italic leading-none md:text-9xl">{s.n}</span>
            <span className="rounded-full border border-current/30 px-3 py-1 font-mono text-[11px] uppercase tracking-widest">{s.tag}</span>
          </div>
          <div>
            <h3 className="mt-10 text-4xl font-semibold tracking-[-0.035em] md:text-6xl">{s.title}</h3>
            <p className="mt-4 max-w-xl text-lg leading-relaxed opacity-75">{s.body}</p>
          </div>
        </div>
        <div className="relative hidden overflow-hidden rounded-3xl border border-current/20 md:col-span-5 md:block">
          <div className="dots absolute inset-0 opacity-20" />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 24 + i * 6, repeat: Infinity, ease: "linear" }} className="absolute inset-10 rounded-full border-2 border-dashed border-current/40" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 16 + i * 4, repeat: Infinity, ease: "linear" }} className="absolute inset-24 rounded-full border-2 border-current/60" />
          <div className="absolute inset-0 grid place-items-center font-serif text-6xl italic">{s.title.split(" ")[0]}</div>
        </div>
      </motion.div>
    </div>
  );
}

export function Process() {
  return (
    <section className="px-5 pt-20 pb-32 md:px-10" id="process">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SplitText text="Build one step at a *time*" className="text-5xl font-semibold tracking-[-0.04em] md:text-8xl" />
          <p className="max-w-sm text-lg text-ink/65">From the initial concept to the final deployment, a transparent path to quality and scalability.</p>
        </div>
        <div className="space-y-6 pb-24">
          {process.map((s, i) => <Card key={s.n} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
