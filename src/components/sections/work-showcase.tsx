"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

export function WorkCard({
  p,
  i,
  className,
  fit,
}: {
  p: (typeof projects)[number];
  i: number;
  className?: string;
  fit?: boolean;
}) {
  return (
    <Link
      href={`/work/${p.slug}`}
      data-cursor="View"
      className={cn("group block", className)}
    >
      {/* Card frame keeps the project colour; the image is the hero inside it */}
      <div
        className={cn(
          "relative flex flex-col overflow-hidden rounded-[2rem] p-3 transition-transform duration-700 group-hover:-rotate-1 group-hover:scale-[0.985] md:p-4",
          fit
            ? "h-[min(calc(100svh-15rem),660px)] min-h-[400px]"
            : "aspect-[4/5]",
          p.bg,
          p.fg,
        )}
      >
        <div className="pointer-events-none absolute inset-0 dots opacity-[0.12] transition-opacity group-hover:opacity-25" />

        {/* IMAGE: takes all the space the text doesn't need */}
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-[1.4rem] bg-black/15">
          <img
            src={p.image || "/projects/rica.png"}
            alt={p.title}
            width={900}
            height={700}
            className="size-full object-cover transition-transform pointer-events-none select-none duration-700 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white backdrop-blur-md">
            {p.category} · {p.year}
          </span>
          <span className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-white text-[#0d0d0d] transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="size-5" />
          </span>
          <span className="absolute bottom-3 left-3 font-serif text-3xl italic leading-none text-white drop-shadow">
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>

        {/* TEXT: fixed height so every card's image is the same size */}
        <div className="relative h-[7rem] shrink-0 overflow-hidden px-2 pt-4 md:h-[8.25rem]">
          <h3 className="line-clamp-2 text-2xl font-semibold leading-[1] tracking-[-0.03em] md:text-3xl">
            {p.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm opacity-75 md:text-base">
            {p.blurb}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
        <span>{p.client}</span>
        <span className="text-ink/50">{p.role[0]}</span>
      </div>
    </Link>
  );
}

export function WorkShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);

  useEffect(() => {
    const measure = () =>
      track.current &&
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section ref={ref} className="relative h-[340vh] bg-paper-2 md:h-[420vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pb-20 pt-5">
        {/* progress bar now lives in the heading row, so cards get the full height */}
        <div className="mb-4 flex shrink-0 items-center justify-between gap-6 px-5 md:mb-6 md:px-10">
          <h2 className="text-[2.4rem] font-semibold leading-none tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
            Selected <span className="font-serif font-normal italic">work</span>
          </h2>
          <div className="flex items-center gap-4">
            <div className="hidden h-1 w-32 overflow-hidden rounded-full bg-ink/10 sm:block md:w-48">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full origin-left rounded-full bg-brand"
              />
            </div>
            <Link
              href="/work"
              className="hidden items-center gap-2 rounded-full border border-ink/25 px-5 py-3 font-medium transition-colors hover:bg-ink hover:text-paper md:inline-flex"
            >
              All projects <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        <motion.div
          ref={track}
          style={{ x }}
          className="flex w-max gap-4 px-5 md:gap-6 md:px-10"
        >
          {projects.map((p, i) => (
            <WorkCard
              key={p.slug}
              p={p}
              i={i}
              fit
              className="w-[80vw] max-w-[380px] shrink-0 md:w-[34vw] md:max-w-[560px]"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
