import type { Metadata } from "next";
import { services, process } from "@/lib/data";
import { SplitText, Reveal } from "@/components/fx/reveal";
import { Badge } from "@/components/ui/badge";
import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <section className="px-5 pb-20 pt-40 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-ink/50">What we do</p>
          <SplitText as="h1" text="Six disciplines. One *team*." className="text-[clamp(3.5rem,11vw,10rem)] font-semibold leading-[0.88] tracking-[-0.05em]" />
          <p className="mt-10 max-w-2xl text-2xl leading-snug text-ink/70">Brand, web, video, AI and automation, scoped as one roadmap so everything you launch feels like it came from the same brain.</p>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-[1500px] border-t border-ink/15">
          {services.map((s) => (
            <article key={s.id} id={s.id} className="grid scroll-mt-24 gap-10 border-b border-ink/15 py-16 md:grid-cols-12 md:py-24">
              <div className="md:sticky md:top-28 md:col-span-5 md:self-start">
                <span className="font-mono text-sm text-brand">{s.n} / 06</span>
                <h2 className="mt-3 text-5xl font-semibold leading-none tracking-[-0.04em] md:text-7xl">{s.title}</h2>
                <div className={cn("mt-8 hidden aspect-[16/10] place-items-center rounded-3xl md:grid", s.accent)}>
                  <Image src={s.image || "/project.png"} alt={s.title} width={300} height={300} className="rounded-3xl object-cover" />
                </div>
              </div>
              <div className="md:col-span-7">
                <Reveal><p className="text-2xl leading-snug md:text-3xl">{s.short}</p></Reveal>
                <Reveal delay={0.05}><p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/65">{s.long}</p></Reveal>
                <p className="mb-3 mt-12 font-mono text-xs uppercase tracking-widest text-ink/50">Deliverables</p>
                <ul className="grid gap-x-8 sm:grid-cols-2">
                  {s.deliverables.map((d, i) => (
                    <Reveal key={d} delay={i * 0.04} y={16}>
                      <li className="group flex items-center gap-3 border-t border-ink/15 py-4 text-lg transition-colors hover:text-brand">
                        <span className="font-mono text-xs text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-2">{d}</span>
                      </li>
                    </Reveal>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap gap-2">
                  {s.tools.map((t) => <Badge key={t}>{t}</Badge>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ink px-5 py-24 text-paper md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <SplitText text="How we *work* together" className="mb-14 text-5xl font-semibold tracking-[-0.04em] md:text-7xl" />
          <div className="grid gap-px overflow-hidden rounded-3xl bg-paper/15 md:grid-cols-4">
            {process.map((p) => (
              <div key={p.n} className="bg-ink p-8 transition-colors hover:bg-ink-2">
                <span className="font-serif text-6xl italic text-lime">{p.n}</span>
                <h3 className="mt-6 text-2xl font-semibold">{p.title}</h3>
                <p className="mt-3 text-paper/60">{p.body}</p>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-paper/40">{p.tag}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Faq />
      <Cta />
    </>
  );
}
