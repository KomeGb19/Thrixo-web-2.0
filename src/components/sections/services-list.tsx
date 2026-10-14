"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services, type Service } from "@/lib/data";
import { SplitText } from "@/components/fx/reveal";
import { cn } from "@/lib/utils";

const accentClass = (s: Service) =>
  s.accent.includes("text-") ? s.accent : `${s.accent} text-ink`;

/** One row. On touch/small screens the preview card expands under the row
 *  when the row scrolls into the middle band of the viewport (no hover needed). */
function ServiceRow({
  s,
  dimmed,
  onEnter,
}: {
  s: Service;
  dimmed: boolean;
  onEnter: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  // true while the row header is inside the middle ~20% of the screen
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  return (
    <div
      className="border-t border-paper/15 transition-opacity duration-500 last:border-b"
      style={{ opacity: dimmed ? 0.3 : 1 }}
    >
      <Link
        ref={ref}
        href={`/services#${s.id}`}
        onMouseEnter={onEnter}
        data-cursor="View"
        className="group relative flex items-center justify-between gap-4 py-7 md:gap-6 md:py-10"
      >
        <div className="flex min-w-0 items-baseline gap-4 md:gap-10">
          <span className="font-mono text-sm text-lime">{s.n}</span>
          <h3
            className={cn(
              "text-[1.75rem] font-semibold leading-[1.05] tracking-[-0.04em] transition-all duration-500 group-hover:translate-x-4 sm:text-4xl md:text-7xl",
              inView ? "text-lime lg:text-paper" : "",
            )}
          >
            {s.title}
          </h3>
        </div>
        <p className="hidden max-w-xs text-paper/60 lg:block">{s.short}</p>
        <span
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-full border border-paper/25 transition-all duration-300 group-hover:rotate-45 group-hover:border-lime group-hover:bg-lime group-hover:text-ink md:size-16",
            inView &&
              "rotate-45 border-lime bg-lime text-ink lg:rotate-0 lg:border-paper/25 lg:bg-transparent lg:text-paper",
          )}
        >
          <ArrowUpRight className="size-4 md:size-7" />
        </span>
      </Link>

      {/* MOBILE / TABLET scroll preview */}
      <AnimatePresence initial={false}>
        {inView && (
          <motion.div
            key="mobile-preview"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <Link
              href={`/services#${s.id}`}
              className={cn(
                "mb-6 flex gap-4 rounded-3xl p-3 shadow-xl",
                accentClass(s),
              )}
            >
              <img
                src={s.image || "/project.png"}
                alt={s.title}
                width={300}
                height={300}
                className="size-32 shrink-0 rounded-2xl object-cover sm:size-40"
              />
              <div className="flex min-w-0 flex-1 flex-col justify-between py-1 pr-1">
                <span className="font-mono text-[11px] uppercase tracking-widest opacity-70">
                  {s.n} / 06
                </span>
                <div>
                  <p className="font-serif text-3xl italic leading-none">
                    {s.title}
                  </p>
                  <ul className="mt-3 space-y-1 font-mono text-[10px] uppercase tracking-wider opacity-80">
                    {s.deliverables.slice(0, 3).map((d) => (
                      <li key={d} className="truncate">
                        + {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
          <SplitText
            text="Core capabilities, *tailored* for growth"
            className="max-w-4xl text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl md:text-8xl"
          />
          <p className="max-w-sm text-lg text-paper/60">
            We blend high-end design with robust engineering to power your
            digital growth. Six disciplines, one team.
          </p>
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
            <ServiceRow
              key={s.id}
              s={s}
              dimmed={active !== null && active !== i}
              onEnter={() => setActive(i)}
            />
          ))}

          {/* DESKTOP hover preview (follows the cursor) */}
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key="preview"
                style={{ x: sx, y: sy }}
                initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: -4 }}
                exit={{ opacity: 0, scale: 0.7 }}
                className="pointer-events-none absolute left-0 top-0 z-20 hidden w-72 lg:block"
              >
                <div
                  className={cn(
                    "flex flex-col gap-4 rounded-3xl p-4 shadow-2xl",
                    accentClass(services[active]),
                  )}
                >
                  <span className="font-mono text-xs uppercase tracking-widest">
                    {services[active].n} / 06
                  </span>
                  <img
                    src={services[active].image || "/project.png"}
                    alt={services[active].title}
                    width={300}
                    height={300}
                    className="aspect-square w-full rounded-2xl object-cover"
                  />
                  <div>
                    <p className="font-serif text-4xl italic leading-none">
                      {services[active].title}
                    </p>
                    <ul className="mt-4 space-y-1 font-mono text-[11px] uppercase tracking-wider opacity-80">
                      {services[active].deliverables.slice(0, 3).map((d) => (
                        <li key={d}>+ {d}</li>
                      ))}
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
