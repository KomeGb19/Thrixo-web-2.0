import { faqs } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SplitText } from "@/components/fx/reveal";

export function Faq() {
  return (
    <section id="faq" className="px-5 py-28 md:px-10">
      <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-12">
        <div className="md:sticky md:top-32 md:col-span-4 md:self-start">
          <SplitText text="Everything you need to *know*" className="text-5xl font-semibold tracking-[-0.04em] md:text-7xl" />
          <p className="mt-6 max-w-sm text-lg text-ink/65">Quick answers to common questions about working with Thrixo. Still curious? Just ask.</p>
        </div>
        <div className="md:col-span-8">
          <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-ink/15">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
