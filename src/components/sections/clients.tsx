import { Marquee } from "@/components/fx/marquee";
import { clients } from "@/lib/data";

export function Clients() {
  return (
    <section className="px-5 py-16 md:px-10">
      <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.25em] text-ink/50">Trusted by the world&apos;s leading innovators</p>
      <Marquee speed={36} reverse className="[--gap:5rem] [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        {clients.map((c) => (
          <span key={c} className="whitespace-nowrap text-4xl font-semibold tracking-tight text-ink/35 transition-colors hover:text-brand md:text-6xl">{c}</span>
        ))}
      </Marquee>
    </section>
  );
}
