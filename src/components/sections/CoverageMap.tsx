import Link from "next/link";
import { LOCATIONS } from "@/lib/site";
import { COPY } from "@/lib/content";
import { FadeIn } from "@/components/animations/FadeIn";
import { MapPin, ArrowRight } from "lucide-react";

export function CoverageMap() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="left">
            <p className="section-eyebrow mb-3">{COPY.coverage.eyebrow}</p>
            <h2 className="font-heading font-extrabold text-espresso text-3xl sm:text-4xl md:text-5xl">{COPY.coverage.heading}</h2>
            <p className="mt-4 lead max-w-lg">{COPY.coverage.sub}</p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {LOCATIONS.map((loc) => (
                <Link key={loc.slug} href={`/locations/${loc.slug}`} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-adobe hover:border-clay/30 hover:shadow-card transition-all text-sm font-heading font-semibold text-cocoa hover:text-clay">
                  <MapPin className="h-4 w-4 text-gold flex-shrink-0" />
                  {loc.name}
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <Link href="/coverage" className="btn-secondary inline-flex">
                View all states <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="relative rounded-3xl overflow-hidden shadow-warm-lg border-4 border-white">
              <img src="/images/coverage.jpg" alt="Nationwide trucking coverage map" className="w-full h-[420px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 rounded-2xl p-4 shadow-warm">
                  <p className="font-heading font-extrabold text-espresso text-xl">All 50 States Covered</p>
                  <p className="text-sm text-mocha mt-1">OTR routes, interstate carriers, fleet operations — we have you covered regardless of where your trucks run.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
