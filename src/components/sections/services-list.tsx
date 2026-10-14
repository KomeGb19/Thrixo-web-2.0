"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";
import { SplitText } from "@/components/fx/reveal";
import { cn } from "@/lib/utils";

export function ServicesList() {
  const [active, setActive] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 24 });
  const sy = useSpring(y, { stiffness: 200, damping: 24 });

  return (
    <section className="bg-ink px-5 py-28 text-paper md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SplitText text="Core capabilities, *tailored* for growth" className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] md:text-8xl" />
          <p className="max-w-sm text-lg text-paper/60">We blend high-end design with robust engineering to power your digital growth. Six disciplines, one team.</p>
        </div>

        <div
          ref={box}
          className="relative"
          onMouseMove={(e) => {
            const r = box.current!.getBoundingClientRect();
            x.set(e.clientX - r.left + 30);
            y.set(e.clientY - r.top - 120);
          }}
          onMouseLeave={() => setActive(null)}
        >
          {services.map((s, i) => (
            <Link key={s.id} href={`/services#${s.id}`} onMouseEnter={() => setActive(i)} data-cursor="View" className="group relative flex items-center justify-between gap-6 border-t border-paper/15 py-7 transition-all duration-500 last:border-b md:py-10" style={{ opacity: active === null || active === i ? 1 : 0.3 }}>
              <div className="flex items-baseline gap-5 md:gap-10">
                <span className="font-mono text-sm text-lime">{s.n}</span>
                <h3 className="text-4xl font-semibold tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-4 md:text-7xl">{s.title}</h3>
              </div>
              <p className="hidden max-w-xs text-paper/60 lg:block">{s.short}</p>
              <span className="grid size-12 shrink-0 place-items-center rounded-full border border-paper/25 transition-all duration-300 group-hover:rotate-45 group-hover:border-lime group-hover:bg-lime group-hover:text-ink md:size-16">
                <ArrowUpRight className="size-5 md:size-7" />
              </span>
            </Link>
          ))}

          <AnimatePresence>
            {active !== null && (
              <motion.div
                key="preview"
                style={{ x: sx, y: sy }}
                initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: -4 }}
                exit={{ opacity: 0, scale: 0.7 }}
                className="pointer-events-none absolute left-0 top-0 z-20 hidden w-72 md:block"
              >
                <div className={cn("flex aspect-[4/5] flex-col justify-between rounded-3xl p-6 text-ink shadow-2xl", services[active].accent)}>
                  <span className="font-mono text-xs uppercase tracking-widest">{services[active].n} / 06</span>
                  <div>
                    <p className="font-serif text-4xl italic leading-none">{services[active].title}</p>
                    <ul className="mt-4 space-y-1 font-mono text-[11px] uppercase tracking-wider opacity-80">
                      {services[active].deliverables.slice(0, 3).map((d) => <li key={d}>+ {d}</li>)}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
