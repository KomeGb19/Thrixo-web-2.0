import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { Reveal, SplitText } from "@/components/fx/reveal";
import { Cta } from "@/components/sections/cta";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: p?.title ?? "Work", description: p?.blurb };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <section className={cn("relative overflow-hidden px-5 pb-16 pt-40 md:px-10", p.bg, p.fg)}>
        <div className="dots absolute inset-0 opacity-[0.12]" />
        <p className="pointer-events-none absolute -right-6 bottom-0 select-none font-serif text-[30vw] italic leading-none opacity-[0.12]">{String(idx + 1).padStart(2, "0")}</p>
        <div className="relative mx-auto max-w-[1500px]">
          <Link href="/work" className="font-mono text-xs uppercase tracking-widest opacity-70 hover:opacity-100">← All work</Link>
          <SplitText as="h1" text={p.title} className="mt-6 max-w-5xl text-[clamp(3rem,9vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.05em]" />
          <p className="mt-8 max-w-2xl text-2xl opacity-80">{p.blurb}</p>
          <dl className="mt-16 grid gap-8 border-t border-current/25 pt-8 font-mono text-xs uppercase tracking-widest sm:grid-cols-4">
            <div><dt className="opacity-60">Client</dt><dd className="mt-2 text-base normal-case tracking-normal">{p.client}</dd></div>
            <div><dt className="opacity-60">Year</dt><dd className="mt-2 text-base normal-case tracking-normal">{p.year}</dd></div>
            <div><dt className="opacity-60">Category</dt><dd className="mt-2 text-base normal-case tracking-normal">{p.category}</dd></div>
            <div><dt className="opacity-60">Role</dt><dd className="mt-2 text-base normal-case tracking-normal">{p.role.join(", ")}</dd></div>
          </dl>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-16 md:grid-cols-2">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">The challenge</p>
            <p className="mt-5 text-3xl font-medium leading-snug tracking-tight md:text-4xl">{p.challenge}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">What we did</p>
            <p className="mt-5 text-xl leading-relaxed text-ink/70">{p.solution}</p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-4 md:grid-cols-3">
          {p.results.map((r, i) => (
            <Reveal key={r.k} delay={i * 0.1}>
              <div className={cn("rounded-[2rem] p-10", i === 1 ? "bg-ink text-paper" : "bg-paper-2")}>
                <p className="text-6xl font-semibold tracking-[-0.05em] md:text-7xl">{r.v}</p>
                <p className="mt-3 font-mono text-xs uppercase tracking-widest opacity-60">{r.k}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Link href={`/work/${next.slug}`} data-cursor="Next" className={cn("group relative block overflow-hidden px-5 py-28 mb-10 md:px-10", next.bg, next.fg)}>
        <p className="font-mono text-xs uppercase tracking-[0.25em] opacity-70">Next project</p>
        <p className="mt-4 flex items-center gap-4 text-[clamp(2.5rem,8vw,7rem)] font-semibold leading-none tracking-[-0.045em]">
          {next.title} <ArrowUpRight className="size-[1em] shrink-0 transition-transform duration-500 group-hover:rotate-45" />
        </p>
      </Link>
      <Cta />
    </>
  );
}
