"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/fx/magnetic";
import { Marquee } from "@/components/fx/marquee";
import { site } from "@/lib/data";

export function Cta() {
  return (
    <section className="px-3 pb-3 md:px-6 md:pb-6">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-brand px-6 py-24 text-white md:py-36">
        <div className="dots absolute inset-0 text-white/15 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute -right-32 -top-32 size-[28rem] rounded-full border-2 border-dashed border-white/25" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-lime">Contact · Let&apos;s talk</p>
          <h2 className="text-[clamp(3.5rem,11vw,10rem)] font-semibold leading-[0.88] tracking-[-0.05em]">
            Let&apos;s talk <span className="font-serif font-normal italic text-lime">strategy.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-xl text-white/80">Start building infrastructure that works as hard as you do. Bring your timeline, your budget, and the idea that won&apos;t leave you alone.</p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a href={site.whatsapp} target="_blank" rel="noreferrer" data-cursor="Chat" className="inline-flex h-16 items-center gap-3 rounded-full bg-lime px-9 text-lg font-semibold text-ink transition-transform hover:scale-105">
                Get started on WhatsApp <ArrowUpRight className="size-5" />
              </a>
            </Magnetic>
            <Magnetic>
              <Link href="/contact" className="inline-flex h-16 items-center rounded-full border border-white/40 px-9 text-lg font-medium transition-colors hover:bg-white hover:text-brand">Send a brief</Link>
            </Magnetic>
          </div>
        </div>
        <Marquee speed={40} className="mt-24 text-5xl font-semibold uppercase tracking-tight text-white/15 md:text-8xl">
          {["Don't overthink it", "Ship it", "Make it weird", "Make it work"].map((t) => <span key={t} className="whitespace-nowrap">{t} ✺</span>)}
        </Marquee>
      </div>
    </section>
  );
}
