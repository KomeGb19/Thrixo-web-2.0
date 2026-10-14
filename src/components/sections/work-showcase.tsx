"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

export function WorkCard({ p, i, className }: { p: (typeof projects)[number]; i: number; className?: string }) {
  return (
    <Link href={`/work/${p.slug}`} data-cursor="View" className={cn("group block", className)}>
      <div className={cn("relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[2rem] p-7 transition-transform duration-700 group-hover:-rotate-1 group-hover:scale-[0.985]", p.bg, p.fg)}>
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs uppercase tracking-widest opacity-70">{p.category} · {p.year}</span>
          <span className="grid size-12 place-items-center rounded-full border border-current/30 transition-all duration-300 group-hover:rotate-45 group-hover:bg-current/10"><ArrowUpRight className="size-5" /></span>
        </div>
        <div className="absolute inset-0 dots opacity-[0.12] transition-opacity group-hover:opacity-25" />
        <p className="pointer-events-none absolute -bottom-6 -right-2 select-none font-serif text-[14rem] italic leading-none opacity-[0.14] transition-transform duration-700 group-hover:-translate-y-3">{String(i + 1).padStart(2, "0")}</p>
        <div className="relative">
          <h3 className="text-4xl font-semibold leading-[0.95] tracking-[-0.035em] md:text-5xl">{p.title}</h3>
          <p className="mt-3 max-w-xs opacity-75">{p.blurb}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
        <span>{p.client}</span>
        <span className="text-ink/50">{p.role[0]}</span>
      </div>
    </Link>
  );
}

export function WorkShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-62%"]);
  return (
    <section ref={ref} className="relative h-[420vh] bg-paper-2">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mb-8 flex items-end justify-between px-5 md:px-10">
          <h2 className="text-5xl font-semibold tracking-[-0.04em] md:text-8xl">Selected <span className="font-serif font-normal italic">work</span></h2>
          <Link href="/work" className="hidden items-center gap-2 rounded-full border border-ink/25 px-5 py-3 font-medium transition-colors hover:bg-ink hover:text-paper md:inline-flex">All projects <ArrowUpRight className="size-4" /></Link>
        </div>
        <motion.div style={{ x }} className="flex w-max gap-6 px-5 md:px-10">
          {projects.map((p, i) => (
            <WorkCard key={p.slug} p={p} i={i} className="w-[78vw] shrink-0 md:w-[30vw] md:max-w-[460px]" />
          ))}
        </motion.div>
        <div className="mx-5 mt-8 h-1 rounded-full bg-ink/10 md:mx-10">
          <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left rounded-full bg-brand" />
        </div>
      </div>
    </section>
  );
}
