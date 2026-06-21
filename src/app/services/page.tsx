import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Truck, UserCheck, ClipboardCheck, BarChart3, Ghost, MapPin, Layers, Zap } from "lucide-react";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { CtaBand } from "@/components/sections/CtaBand";
import { SERVICES } from "@/lib/site";
import { COPY } from "@/lib/content";

export const metadata: Metadata = {
  title: "Trucking Workers Comp Services",
  description: "Complete workers' compensation solutions for trucking companies — owner-operators, fleets, OTR drivers, DOT compliance, and same-day certificates.",
};

const iconMap: Record<string, React.ElementType> = {
  Truck, UserCheck, ClipboardCheck, BarChart3, Ghost, MapPin, Layers, Zap,
};

export default function ServicesPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="pt-28">
        <section className="py-16 bg-warm-radial">
          <div className="container-wide text-center max-w-3xl mx-auto">
            <FadeIn>
              <p className="section-eyebrow mb-3">{COPY.servicesPage.eyebrow}</p>
              <h1 className="font-heading font-extrabold text-espresso text-4xl sm:text-5xl">{COPY.servicesPage.heading}</h1>
              <p className="mt-4 lead">{COPY.servicesPage.sub}</p>
            </FadeIn>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service, i) => {
                const Icon = iconMap[service.icon] ?? Truck;
                return (
                  <FadeIn key={service.slug} delay={i * 0.06}>
                    <Link href={`/services/${service.slug}`} className="group flex flex-col h-full card-base p-8 hover:border-clay/30">
                      <div className="h-14 w-14 rounded-2xl bg-clay-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <h2 className="font-heading font-bold text-espresso text-xl mb-3 group-hover:text-clay transition-colors">{service.title}</h2>
                      <p className="text-mocha leading-relaxed flex-1">{service.description}</p>
                      <div className="mt-6 flex items-center gap-1.5 text-sm font-heading font-bold text-clay">
                        View coverage details <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
