import Link from "next/link";
import { ArrowRight, Truck, UserCheck, ClipboardCheck, BarChart3, Ghost, MapPin, Layers, Zap } from "lucide-react";
import { SERVICES } from "@/lib/site";
import { COPY } from "@/lib/content";
import { FadeIn } from "@/components/animations/FadeIn";

const iconMap: Record<string, React.ElementType> = {
  Truck, UserCheck, ClipboardCheck, BarChart3, Ghost, MapPin, Layers, Zap,
};

export function ServicesGrid() {
  return (
    <section className="py-20 md:py-28 bg-sand">
      <div className="container-wide">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <p className="section-eyebrow mb-3">{COPY.servicesGrid.eyebrow}</p>
          <h2 className="font-heading font-extrabold text-espresso text-3xl sm:text-4xl md:text-5xl">{COPY.servicesGrid.heading}</h2>
          <p className="mt-4 lead">{COPY.servicesGrid.sub}</p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Truck;
            return (
              <FadeIn key={service.slug} delay={i * 0.05} direction="up">
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex flex-col h-full card-base p-6 hover:border-clay/30"
                >
                  <div className="h-12 w-12 rounded-2xl bg-clay-gradient flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-espresso text-lg mb-2 group-hover:text-clay transition-colors">{service.title}</h3>
                  <p className="text-sm text-mocha leading-relaxed flex-1">{service.shortDesc}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-heading font-bold text-clay">
                    Learn more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
