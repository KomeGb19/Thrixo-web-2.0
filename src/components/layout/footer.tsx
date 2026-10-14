"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { nav, site } from "@/lib/data";

function LagosClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Africa/Lagos" }).format(new Date()));
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t || "--:--:--"} WAT</span>;
}

export function Footer() {
  const [sent, setSent] = useState(false);
  return (
    <footer className="relative overflow-hidden bg-ink px-5 pb-8 pt-24 text-paper md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-4xl italic leading-tight md:text-5xl">Modern automation infrastructure, wrapped in <span className="text-lime">good taste</span>.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="mt-10 flex max-w-md items-center gap-2 rounded-full border border-paper/20 p-1.5 pl-5"
            >
              <input required type="email" placeholder={sent ? "You're on the list ✓" : "Your email for the newsletter"} disabled={sent} className="w-full bg-transparent text-base outline-none placeholder:text-paper/40" />
              <button className="grid size-11 shrink-0 place-items-center rounded-full bg-lime text-ink transition-transform hover:rotate-45" aria-label="Subscribe">
                <ArrowUpRight className="size-5" />
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-3 md:pl-16">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-paper/50">Sitemap</p>
              <ul className="space-y-2 text-xl">
                {[{ label: "Home", href: "/" }, ...nav].map((l) => (
                  <li key={l.href}><Link className="transition-colors hover:text-lime" href={l.href}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-paper/50">Social</p>
              <ul className="space-y-2 text-xl">
                {site.socials.map((s) => (
                  <li key={s.label}><a className="inline-flex items-center gap-1 transition-colors hover:text-lime" href={s.href} target="_blank" rel="noreferrer">{s.label} <ArrowUpRight className="size-4" /></a></li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-paper/50">Say hello</p>
              <a className="text-xl underline decoration-lime underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>
              <p className="mt-6 font-mono text-xs uppercase tracking-widest text-paper/50">{site.city}</p>
              <p className="mt-1 font-mono text-sm text-lime"><LagosClock /></p>
            </div>
          </div>
        </div>

        <motion.p
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 select-none text-center text-[26vw] font-semibold leading-[0.78] tracking-tighter text-paper/95 md:text-[22vw]"
        >
          thrixo<span className="text-brand">.</span>
        </motion.p>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-paper/15 pt-6 font-mono text-xs uppercase tracking-widest text-paper/50 md:flex-row">
          <span>Thrixo Agency © {new Date().getFullYear()}. All rights reserved.</span>
          <span>Don&apos;t overthink it • Ship it</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-2 transition-colors hover:text-lime">
            Back to top <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
