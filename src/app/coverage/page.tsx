import type { Metadata } from "next";
import Link from "next/link";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { CtaBand } from "@/components/sections/CtaBand";
import { COPY, US_STATES } from "@/lib/content";
import { LOCATIONS } from "@/lib/site";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Nationwide Coverage | Trucking Workers Compensation",
  description: "Trucking workers' comp coverage in all 50 states. OTR routes, interstate carriers, fleet operations — we follow your trucks everywhere.",
};

export default function CoveragePage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="pt-28">
        <section className="py-16 bg-warm-radial">
          <div className="container-wide text-center max-w-2xl mx-auto">
            <FadeIn>
              <p className="section-eyebrow mb-3">{COPY.coveragePage.eyebrow}</p>
              <h1 className="font-heading font-extrabold text-espresso text-4xl sm:text-5xl">{COPY.coveragePage.heading}</h1>
              <p className="mt-4 lead">{COPY.coveragePage.sub}</p>
            </FadeIn>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-wide">
            <FadeIn className="mb-12 text-center">
              <h2 className="font-heading font-bold text-espresso text-2xl">Major Trucking Hubs</h2>
              <p className="text-mocha mt-2">Our specialists know the unique requirements in each major trucking region.</p>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {LOCATIONS.map((loc, i) => (
                <FadeIn key={loc.slug} delay={i * 0.05}>
                  <Link href={`/locations/${loc.slug}`} className="group flex items-center gap-3 p-5 rounded-2xl bg-sand border border-adobe hover:border-clay/30 hover:shadow-card transition-all">
                    <div className="h-10 w-10 rounded-xl bg-clay-gradient flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-espresso group-hover:text-clay transition-colors">{loc.name}</p>
                      <p className="text-xs text-mocha">{loc.abbr}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-clay ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </FadeIn>
              ))}
            </div>

            <FadeIn className="text-center mb-8">
              <h2 className="font-heading font-bold text-espresso text-2xl">All 50 States</h2>
              <p className="text-mocha mt-2">Licensed and active in every state, including monopolistic states.</p>
            </FadeIn>
            <FadeIn>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2">
                {US_STATES.map((state) => (
                  <div key={state} className="px-3 py-2 rounded-lg bg-sand border border-adobe text-xs font-medium text-mocha text-center hover:border-clay/30 hover:text-clay transition-colors">
                    {state}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
