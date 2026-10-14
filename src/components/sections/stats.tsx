import { stats } from "@/lib/data";
import { CountUp } from "@/components/fx/count-up";
import { Reveal } from "@/components/fx/reveal";

export function Stats() {
  return (
    <section className="px-5 py-24 md:px-10">
      <div className="mx-auto grid max-w-[1500px] gap-px overflow-hidden rounded-[2rem] border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} y={20} className="bg-paper p-8 md:p-10">
            <p className="text-6xl font-semibold tracking-[-0.05em] md:text-7xl"><CountUp to={s.to} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} /></p>
            <p className="mt-3 text-ink/65">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
