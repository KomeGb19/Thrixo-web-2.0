"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/fx/spotlight-card";
import { CountUp } from "@/components/fx/count-up";
import { Reveal, SplitText } from "@/components/fx/reveal";
import { Marquee } from "@/components/fx/marquee";

function TypingCard() {
  const lines = [
    "Drafting launch copy…",
    "Tuning brand voice…",
    "Generating 12 ad variants…",
    "Human edit: approved ✓",
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % lines.length), 1800);
    return () => clearInterval(id);
  }, [lines.length]);
  return (
    <div className="mt-6 rounded-2xl bg-ink p-4 font-mono text-sm text-lime">
      <div className="mb-3 flex gap-1.5">
        <i className="size-2.5 rounded-full bg-coral" />
        <i className="size-2.5 rounded-full bg-lime" />
        <i className="size-2.5 rounded-full bg-sky" />
      </div>
      <motion.p
        key={i}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
      >
        &gt; {lines[i]}
        <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-lime align-middle" />
      </motion.p>
    </div>
  );
}

function Bars() {
  const h = [30, 45, 38, 62, 55, 78, 70, 92];
  return (
    <div className="mt-6 flex h-32 items-end gap-2">
      {h.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${v}%` }}
          viewport={{ once: true }}
          transition={{
            delay: i * 0.07,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={
            i === h.length - 1
              ? "flex-1 rounded-t-lg bg-brand"
              : "flex-1 rounded-t-lg bg-ink/15"
          }
        />
      ))}
    </div>
  );
}

function Kanban() {
  const cols = [
    { t: "Brief", c: ["Moodboard", "Scope"] },
    { t: "Build", c: ["Hero", "CMS", "QA"] },
    { t: "Live", c: ["Launch"] },
  ];
  return (
    <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
      {cols.map((col, ci) => (
        <div key={col.t} className="rounded-xl bg-ink/5 p-2">
          <p className="mb-2 font-mono uppercase tracking-wider text-ink/50">
            {col.t}
          </p>
          {col.c.map((c, k) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.15 + k * 0.1 }}
              className="mb-1.5 rounded-lg bg-paper px-2 py-1.5 font-medium shadow-sm"
            >
              {c}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Bento() {
  return (
    <section className="px-5 py-28 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <SplitText
          text="One team. *Every* layer of the build."
          className="mb-14 max-w-4xl text-5xl font-semibold tracking-[-0.04em] md:text-8xl"
        />
        <div className="grid auto-rows-fr gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-3">
            <SpotlightCard
              className="h-full rounded-[2rem] border border-ink/10 bg-paper-2 p-8"
              color="rgba(91,61,245,0.18)"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-ink/50">
                Real-time conversions
              </p>
              <p className="mt-2 text-7xl font-semibold tracking-tighter md:text-8xl">
                <CountUp to={51.4} decimals={1} prefix="+" suffix="%" />
              </p>
              <p className="mt-2 max-w-xs text-ink/65">
                Track growth and customer traffic as your business scales.
              </p>
              <Bars />
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-3">
            <SpotlightCard
              className="h-full rounded-[2rem] bg-brand p-8 text-white"
              color="rgba(214,255,63,0.25)"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-white/60">
                Adaptive product design
              </p>
              <h3 className="mt-2 max-w-sm text-4xl font-semibold leading-none tracking-tight md:text-5xl">
                Products people{" "}
                <span className="font-serif font-normal italic text-lime">
                  come back
                </span>{" "}
                to.
              </h3>
              <p className="mt-4 max-w-sm text-white/75">
                User-centric design that prioritises intuition, aesthetics and
                long-term engagement.
              </p>
              <TypingCard />
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.05} className="md:col-span-2">
            <SpotlightCard
              className="h-full rounded-[2rem] bg-lime p-8"
              color="rgba(255,255,255,0.45)"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
                Project management
              </p>
              <h3 className="mt-2 text-3xl font-semibold leading-tight tracking-tight">
                Zero chaos, from kickoff to launch.
              </h3>
              <Kanban />
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.1} className="min-w-0 md:col-span-2">
            <SpotlightCard
              className="h-full min-w-0 overflow-hidden rounded-[2rem] bg-ink p-8 text-paper"
              color="rgba(214,255,63,0.2)"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-paper/50">
                Integrations ecosystem
              </p>

              <p className="mt-2 text-7xl font-semibold tracking-tighter text-lime">
                <CountUp to={100} suffix="+" />
              </p>

              <p className="mt-1 text-paper/65">
                Connected tools. Millions of actions handled.
              </p>

              <Marquee speed={18} className="mt-8">
                {[
                  "Slack",
                  "WhatsApp",
                  "Notion",
                  "Stripe",
                  "Supabase",
                  "Zapier",
                  "GitHub",
                  "Figma",
                ].map((t) => (
                  <span
                    key={t}
                    className="shrink-0 rounded-full border border-paper/20 px-4 py-2 text-sm"
                  >
                    {t}
                  </span>
                ))}
              </Marquee>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-2">
            <SpotlightCard
              className="h-full rounded-[2rem] bg-coral p-8"
              color="rgba(255,255,255,0.4)"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
                Always-on reliability
              </p>
              <h3 className="mt-2 text-3xl font-semibold leading-tight tracking-tight">
                Monitoring &amp; support built in.
              </h3>
              <div className="mt-8 flex items-center gap-3">
                <span className="relative flex size-4">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-ink/60" />
                  <span className="relative inline-flex size-4 rounded-full bg-ink" />
                </span>
                <span className="font-mono text-sm uppercase tracking-widest">
                  All systems operational
                </span>
              </div>
              <p className="mt-6 text-5xl font-semibold tracking-tighter">
                24/7
              </p>
              <p className="text-ink/70">
                eyes on your systems, so you don't have to be.
              </p>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
