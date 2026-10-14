"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { pricing, site } from "@/lib/data";
import { SplitText } from "@/components/fx/reveal";
import { SpotlightCard } from "@/components/fx/spotlight-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [mode, setMode] = useState<"projects" | "retainers">("projects");
  const plans = pricing[mode];
  return (
    <section id="pricing" className="px-5 py-28 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SplitText
            text="Pricing that *scales* with you"
            className="max-w-3xl text-5xl font-semibold tracking-[-0.04em] md:text-8xl"
          />
          <div className="relative inline-flex w-fit rounded-full bg-ink/8 p-1.5">
            {(["projects", "retainers"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "relative z-10 rounded-full px-6 py-3 font-medium capitalize transition-colors",
                  mode === m ? "text-paper" : "text-ink/60",
                )}
              >
                {mode === m && (
                  <motion.span
                    layoutId="price-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex items-center gap-3 rounded-full bg-brand px-5 py-3 font-medium md:w-fit">
          <span className="grid size-6 place-items-center rounded-full bg-ink font-mono text-xs text-brand">
            %
          </span>{" "}
          {pricing.banner}
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={mode + p.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <SpotlightCard
                className={cn(
                  "flex h-full flex-col rounded-[2rem] p-8 md:p-10",
                  p.hot
                    ? "bg-ink text-paper"
                    : "border border-ink/15 bg-paper-2",
                )}
                color={p.hot ? "rgba(250, 61, 3,0.2)" : "rgba(91,61,245,0.15)"}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">{p.name}</h3>
                  {p.hot && (
                    <span className="rounded-full bg-brand px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-ink">
                      Most popular
                    </span>
                  )}
                </div>
                <p className="mt-6 flex items-baseline gap-2">
                  {p.note && (
                    <span className="font-mono text-xs uppercase tracking-widest opacity-50">
                      {p.note === "from" ? "from" : ""}
                    </span>
                  )}
                  <span className="text-6xl font-semibold tracking-[-0.05em]">
                    {p.price}
                  </span>
                  {p.note && p.note !== "from" && (
                    <span className="opacity-50">{p.note}</span>
                  )}
                </p>
                <p className="mt-3 opacity-65">{p.blurb}</p>
                <ul className="my-8 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check
                        className={cn(
                          "mt-1 size-4 shrink-0",
                          p.hot ? "text-brand" : "text-brand",
                        )}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={p.hot ? "brand" : "default"}
                  size="lg"
                  className="w-full"
                >
                  <a href={site.whatsapp} target="_blank" rel="noreferrer">
                    Get a quote
                  </a>
                </Button>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-ink/45">
          Indicative starting prices in NGN. Final quotes depend on scope.
        </p>
      </div>
    </section>
  );
}
