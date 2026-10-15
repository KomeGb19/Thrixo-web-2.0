import type { Metadata } from "next";
import { values, team, stats } from "@/lib/data";
import { SplitText, Reveal } from "@/components/fx/reveal";
import { TiltCard } from "@/components/fx/tilt-card";
import { Marquee } from "@/components/fx/marquee";
import { CountUp } from "@/components/fx/count-up";
import { Wall } from "@/components/sections/wall";
import { Cta } from "@/components/sections/cta";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <section className="px-5 pb-24 pt-40 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-ink/50">About Thrixo</p>
          <SplitText as="h1" text="We bridge the gap between *vision* and reality." className="max-w-6xl text-[clamp(3rem,9vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.05em]" />
          <div className="mt-16 grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-5"><p className="text-2xl leading-snug">Thrixo is a Lagos creative agency building tools of the future for ambitious businesses.</p></Reveal>
            <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-ink/70 md:col-span-6 md:col-start-7">
              <p>We started with a simple frustration: brands were paying one vendor for design, another for code, a third for content, and nobody owned the gaps between them. So we became the gap-closers.</p>
              <p>Today our team of designers, engineers, editors and project leads works as one unit across web, brand, video, AI content and automation, building systems that keep running while you focus on the business.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="border-y border-ink bg-lime py-5">
        <Marquee speed={35} className="text-5xl font-semibold uppercase tracking-tight md:text-7xl">
          {["Lagos", "Design", "Engineering", "Motion", "Automation", "AI"].map((t) => <span key={t} className="flex items-center gap-8">{t} <span className="font-serif italic">✺</span></span>)}
        </Marquee>
      </div>

      <section className="px-5 py-28 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <SplitText text="What we *stand* for" className="mb-14 text-5xl font-semibold tracking-[-0.04em] md:text-8xl" />
          <div className="grid gap-px overflow-hidden rounded-3xl bg-ink/15 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.06} y={20} className="bg-paper p-10 transition-colors hover:bg-paper-2 md:p-14">
                <span className="font-mono text-sm text-brand">0{i + 1}</span>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">{v.t}</h3>
                <p className="mt-3 max-w-md text-lg text-ink/65">{v.b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-5 py-28 text-paper md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <SplitText text="The *humans* behind it" className="mb-14 text-5xl font-semibold tracking-[-0.04em] md:text-8xl" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <TiltCard key={m.name}>
                <div className={cn("flex aspect-[3/4] flex-col justify-between rounded-[2rem] p-7 text-ink", m.color)}>
                  <span className="font-mono text-xs uppercase tracking-widest opacity-60">0{i + 1}</span>
                  <span className="font-serif text-[9rem] italic leading-none opacity-30" style={{ transform: "translateZ(40px)" }}>{m.name[0]}</span>
                  <div style={{ transform: "translateZ(30px)" }}>
                    <p className="text-2xl font-semibold leading-tight">{m.name}</p>
                    <p className="font-mono text-xs uppercase tracking-widest opacity-60">{m.role}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
          {/* <p className="mt-8 font-mono text-xs uppercase tracking-widest text-paper/40">Placeholder roles. Swap in real names and photos in lib/data.ts.</p> */}
        </div>
      </section>

      <section className="px-5 py-24 md:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-t-2 border-ink pt-5">
              <p className="text-6xl font-semibold tracking-[-0.05em]"><CountUp to={s.to} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} /></p>
              <p className="mt-2 text-ink/65">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
      <Wall />
      <Cta />
    </>
  );
}
