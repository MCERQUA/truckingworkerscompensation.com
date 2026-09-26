import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Process } from "@/components/sections/Process";
import { CoverageMap } from "@/components/sections/CoverageMap";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <ServicesGrid />
        <WhyChoose />
        <CtaBand />
        <Process />
        <CoverageMap />
        <FaqAccordion limit={8} />
        <FinalCta />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
