"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Play } from "lucide-react";
import { Magnetic } from "@/components/fx/magnetic";
import { Marquee } from "@/components/fx/marquee";
import { Badge } from "@/components/ui/badge";
import { site } from "@/lib/data";
import Image from "next/image";

const words = ["websites", "brands", "films", "AI content", "systems"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 40]);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} className="grain relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-0 pt-32 md:px-10">
      <div className="dots pointer-events-none absolute inset-0 text-ink/[0.09] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* floating stickers */}
      <motion.div style={{ y: y1 }} className="absolute right-[6%] top-[22%] hidden md:block">
        <div style={{ "--r": "-12deg" } as React.CSSProperties} className="animate-float rounded-full bg-lime px-6 py-3 text-lg font-semibold shadow-[0_8px_0_rgba(0,0,0,.12)]">+51.4% conv.</div>
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute right-[22%] top-[58%] hidden md:block">
        <div style={{ "--r": "8deg" } as React.CSSProperties} className="animate-float rounded-full bg-coral px-6 py-3 text-lg font-semibold shadow-[0_8px_0_rgba(0,0,0,.12)] [animation-delay:-2s]">Made in Lagos</div>
      </motion.div>
     

      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1 }} className="mb-8 flex flex-wrap items-center gap-3">
          <Badge className="bg-ink text-paper"><span className="size-2 animate-pulse rounded-full bg-lime" /> Booking Q4 2026</Badge>
          <Badge>Creative agency · Lagos</Badge>
          <Badge className="hidden sm:inline-flex">10% off your first build</Badge>
        </motion.div>

        <h1 className="text-[clamp(3.2rem,11vw,11rem)] font-semibold leading-[0.88] tracking-[-0.045em]">
          {["We make", "things that"].map((line, idx) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 2 + idx * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}>{line}</motion.span>
            </span>
          ))}
          <span className="block overflow-hidden pb-[0.12em]">
            <motion.span className="inline-flex items-baseline gap-4" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 2.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
              <span className="font-serif font-normal italic text-brand">
                <AnimatePresence mode="wait">
                  <motion.span key={words[i]} className="inline-block" initial={{ y: "60%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-60%", opacity: 0 }} transition={{ duration: 0.4 }}>
                    {words[i]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span>run.</span>
            </motion.span>
          </span>
        </h1>

        <div className="mt-10 grid items-end gap-8 md:grid-cols-12">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }} className="max-w-xl text-xl leading-snug text-ink/70 md:col-span-6 md:text-2xl">
            Thrixo bridges the gap between vision and reality. We design world-class websites, brands, films and AI content, powered by tech infrastructure that evolves with your business.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.7 }} className="flex flex-wrap items-center gap-4 md:col-span-6 md:justify-end">
            <Magnetic>
              <a href={site.whatsapp} target="_blank" rel="noreferrer" data-cursor="Go" className="inline-flex h-16 items-center gap-3 rounded-full bg-ink px-8 text-lg font-medium text-paper transition-colors hover:bg-brand">
                Start a project <ArrowDownRight className="size-5 -rotate-90" />
              </a>
            </Magnetic>
            <Magnetic>
              <Link href="/work" data-cursor="Play" className="inline-flex h-16 items-center gap-3 rounded-full border border-ink/25 px-8 text-lg font-medium transition-colors hover:bg-lime">
                <span className="grid size-8 place-items-center rounded-full bg-ink text-brand"><Play className="size-3 fill-current" /></span>
                See the work
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 -mx-5 mt-14 border-y border-ink/15 bg-ink py-4 text-paper md:-mx-10">
        <Marquee speed={28} className="text-2xl font-medium md:text-3xl">
          {["Web Design", "Graphics", "Project Management", "Video", "AI Content", "Automation"].map((t) => (
            <span key={t} className="flex items-center gap-8">
              {t} <span className="font-serif italic text-lime">✺</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
