import type { Metadata } from "next";
import { ContactForm } from "./contact-form";
import { SplitText } from "@/components/fx/reveal";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="px-5 pb-28 pt-40 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-ink/50">Contact · Let&apos;s talk</p>
        <SplitText as="h1" text="Say *hello.*" className="text-[clamp(4rem,14vw,13rem)] font-semibold leading-[0.85] tracking-[-0.055em]" />
        <p className="mt-8 max-w-xl text-2xl text-ink/70">Whatever it is, if you&apos;re trying to make people&apos;s lives better, we&apos;re in. Bring your timeline, your budget, and the idea that won&apos;t leave you alone.</p>
        <ContactForm />
      </div>
    </section>
  );
}
