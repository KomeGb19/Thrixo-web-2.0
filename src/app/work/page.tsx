import type { Metadata } from "next";
import { WorkGrid } from "./work-grid";
import { SplitText } from "@/components/fx/reveal";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <>
      <section className="px-5 pb-10 pt-40 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-ink/50">Selected work · 2025-2026</p>
          <SplitText as="h1" text="Proof, not *promises*." className="text-[clamp(3.5rem,11vw,10rem)] font-semibold leading-[0.88] tracking-[-0.05em]" />
        </div>
      </section>
      <WorkGrid />
      <Cta />
    </>
  );
}
