import { Hero } from "@/components/sections/hero";
import { Clients } from "@/components/sections/clients";
import { Manifesto } from "@/components/sections/manifesto";
import { ServicesList } from "@/components/sections/services-list";
import { Bento } from "@/components/sections/bento";
import { WorkShowcase } from "@/components/sections/work-showcase";
import { Process } from "@/components/sections/process";
import { Wall } from "@/components/sections/wall";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Manifesto />
      <ServicesList />
      <Bento />
      <WorkShowcase />
      <Process />
      <Wall />
      <Stats />
      <Testimonials />
      <Pricing />
      <Faq />
      <Cta />
    </>
  );
}
