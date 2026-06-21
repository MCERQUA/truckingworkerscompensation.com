import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { CtaBand } from "@/components/sections/CtaBand";
import { SERVICES, LOCATIONS, SITE } from "@/lib/site";

export async function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const loc = LOCATIONS.find((l) => l.slug === slug);
  if (!loc) return {};
  return {
    title: `Trucking Workers Comp in ${loc.name} | ${loc.abbr} Coverage`,
    description: `Workers' compensation for trucking companies, owner-operators, and fleets in ${loc.name}. Same-day certificates, DOT compliance, and competitive rates.`,
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = LOCATIONS.find((l) => l.slug === slug);
  if (!loc) notFound();

  return (
    <SmoothScroll>
      <Navbar />
      <main className="pt-28">
        <section className="py-16 bg-warm-radial">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 pill-clay mb-4">
                <MapPin className="h-4 w-4" />{loc.name} ({loc.abbr})
              </div>
              <h1 className="font-heading font-extrabold text-espresso text-4xl sm:text-5xl">
                Trucking Workers&apos; Comp in {loc.name}
              </h1>
              <p className="mt-4 lead">
                Workers&apos; compensation for motor carriers, owner-operators, and fleets in {loc.name}. Same-day certificates issued. {loc.abbr} state requirements handled.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/quote" className="btn-primary">Get a {loc.abbr} Quote <ArrowRight className="h-4 w-4" /></Link>
                <a href={SITE.phoneHref} className="btn-secondary">{SITE.phone}</a>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-wide max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="font-heading font-extrabold text-espresso text-2xl sm:text-3xl mb-6">
                {loc.name} Trucking WC Coverage
              </h2>
              <p className="text-mocha leading-relaxed mb-8">
                Trucking companies operating in {loc.name} face state-specific workers&apos; compensation requirements that general brokers often miss. Our specialists know {loc.name}&apos;s classification codes, filing requirements, and carrier landscape — ensuring your fleet stays compliant without overpaying.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {[
                  `Same-day WC certificates for ${loc.name} brokers and shippers`,
                  `${loc.abbr} state filing and compliance handled`,
                  `DOT audit support for ${loc.name}-based carriers`,
                  `Owner-operator coverage options in ${loc.name}`,
                  `Fleet policies covering all ${loc.abbr} locations`,
                  `Pay-as-you-go programs available in ${loc.name}`,
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 p-4 rounded-xl bg-sand border border-adobe">
                    <CheckCircle2 className="h-5 w-5 text-clay flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-mocha">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn>
              <h2 className="font-heading font-extrabold text-espresso text-2xl mb-6">Services Available in {loc.name}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="group flex items-center gap-3 p-4 rounded-xl bg-white border border-adobe hover:border-clay/30 hover:shadow-card transition-all">
                    <div className="h-8 w-8 rounded-lg bg-clay-gradient flex items-center justify-center flex-shrink-0">
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-heading font-bold text-espresso group-hover:text-clay transition-colors">{s.title}</span>
                  </Link>
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
