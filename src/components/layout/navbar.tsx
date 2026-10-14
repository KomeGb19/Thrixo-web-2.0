"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/fx/magnetic";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200 && !open);
    setScrolled(y > 40);
  });
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-120%" : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[100] px-4 pt-4 md:px-8"
      >
        <div className={cn("mx-auto flex max-w-[1500px] items-center justify-between rounded-full px-5 py-3 transition-all duration-300", scrolled && !open ? "bg-paper/80 shadow-[0_6px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl" : "", open && "text-paper")}>
          <Link href="/" className="relative z-[110] flex items-center gap-2 text-2xl font-semibold tracking-tight" data-cursor="Home">
            <span className="grid size-9 place-items-center rounded-full bg-ink font-serif text-xl italic text-lime">t</span>
            Thrixo
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((l) => (
              <Link key={l.href} href={l.href} className="group relative overflow-hidden rounded-full px-4 py-2 text-[15px] font-medium">
                <span className={cn("relative z-10 transition-colors", pathname.startsWith(l.href) && "text-brand")}>{l.label}</span>
                <span className="absolute inset-0 -z-0 translate-y-full rounded-full bg-lime transition-transform duration-300 group-hover:translate-y-0" />
              </Link>
            ))}
          </nav>

          <div className="relative z-[110] flex items-center gap-2">
            <Magnetic strength={0.25} className="hidden md:inline-block">
              <a href={site.whatsapp} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-1.5 rounded-full bg-ink px-5 text-sm font-medium text-paper transition-colors hover:bg-brand">
                Say Hello <span className="text-lime">+</span>
              </a>
            </Magnetic>
            <button aria-label="Toggle menu" onClick={() => setOpen((o) => !o)} className={cn("grid size-11 place-items-center rounded-full border md:hidden", open ? "border-paper/30" : "border-ink/20")}>
              <span className="relative block h-3 w-5">
                <span className={cn("absolute left-0 h-[2px] w-5 bg-current transition-all", open ? "top-1.5 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 h-[2px] w-5 bg-current transition-all", open ? "top-1.5 -rotate-45" : "top-3")} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 48px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 48px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 48px) 44px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] flex flex-col justify-end bg-ink p-6 pb-10 text-paper md:hidden"
          >
            <ul className="space-y-1">
              {[{ label: "Home", href: "/" }, ...nav].map((l, i) => (
                <motion.li key={l.href} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.07 }}>
                  <Link href={l.href} className="flex items-baseline gap-3 text-6xl font-semibold tracking-tighter">
                    <span className="font-mono text-xs text-lime">0{i + 1}</span>
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <a href={site.whatsapp} className="mt-8 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-lime">
              Start a project <ArrowUpRight className="size-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
