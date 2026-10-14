"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/lib/data";
import { WorkCard } from "@/components/sections/work-showcase";
import { cn } from "@/lib/utils";

const cats = ["All", "Web", "Brand", "Video", "AI", "Systems"] as const;

export function WorkGrid() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const list = projects.filter((p) => cat === "All" || p.category === cat);
  return (
    <section className="px-5 pb-28 pt-10 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={cn("relative rounded-full border border-ink/20 px-5 py-2.5 font-medium transition-colors", cat === c ? "text-paper" : "hover:bg-ink/5")}>
              {cat === c && <motion.span layoutId="work-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>
        <motion.div layout className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }} className={i % 3 === 1 ? "lg:mt-16" : ""}>
                <WorkCard p={p} i={projects.indexOf(p)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <p className="py-20 text-center text-xl text-ink/50">Nothing here yet. Watch this space.</p>}
      </div>
    </section>
  );
}
