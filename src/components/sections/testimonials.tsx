import { testimonials } from "@/lib/data";
import { Marquee } from "@/components/fx/marquee";
import { SplitText } from "@/components/fx/reveal";

function Card({ t, tone }: { t: (typeof testimonials)[number]; tone: string }) {
  return (
    <figure className={`flex w-[340px] shrink-0 flex-col justify-between rounded-[1.75rem] p-7 md:w-[420px] ${tone}`}>
      <blockquote className="text-xl leading-snug tracking-tight">&ldquo;{t.q}&rdquo;</blockquote>
      <figcaption className="mt-8 flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-ink font-semibold text-lime">{t.name.split(" ").map((n) => n[0]).join("")}</span>
        <span>
          <span className="block font-semibold">{t.name}</span>
          <span className="block font-mono text-[11px] uppercase tracking-wider opacity-60">{t.role}, {t.co}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const tones = ["bg-lime", "bg-paper-2", "bg-sky", "bg-coral", "bg-brand-soft", "bg-paper-2"];
  return (
    <section className="overflow-hidden py-28">
      <div className="mx-auto mb-14 max-w-[1500px] px-5 md:px-10">
        <SplitText text="Trusted by businesses who move *faster*" className="max-w-5xl text-5xl font-semibold tracking-[-0.04em] md:text-8xl" />
      </div>
      <Marquee speed={60} className="mb-6 [--gap:1.5rem]">
        {testimonials.map((t, i) => <Card key={t.name} t={t} tone={tones[i % tones.length]} />)}
      </Marquee>
      <Marquee speed={70} reverse className="[--gap:1.5rem]">
        {[...testimonials].reverse().map((t, i) => <Card key={t.name} t={t} tone={tones[(i + 2) % tones.length]} />)}
      </Marquee>
    </section>
  );
}
