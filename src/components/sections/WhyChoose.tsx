import { Truck, Zap, BarChart3, ClipboardCheck, Shield, HeartHandshake } from "lucide-react";
import { WHY_CHOOSE } from "@/lib/content";
import { COPY } from "@/lib/content";
import { FadeIn } from "@/components/animations/FadeIn";

const iconMap: Record<string, React.ElementType> = {
  Truck, Zap, BarChart3, ClipboardCheck, Shield, HeartHandshake,
};

export function WhyChoose() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="left">
            <p className="section-eyebrow mb-3">{COPY.why.eyebrow}</p>
            <h2 className="font-heading font-extrabold text-espresso text-3xl sm:text-4xl md:text-5xl">{COPY.why.heading}</h2>
            <p className="mt-4 lead max-w-lg">{COPY.why.sub}</p>

            <div className="mt-10 relative overflow-hidden rounded-3xl">
              <img src="/images/about.jpg" alt="Trucking insurance specialists" className="w-full h-72 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 bg-white/95 rounded-2xl p-4 shadow-warm">
                <p className="font-heading font-extrabold text-espresso text-2xl">20+</p>
                <p className="text-xs text-mocha">Years insuring trucking</p>
              </div>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-6">
            {WHY_CHOOSE.map((item, i) => {
              const Icon = iconMap[item.icon] ?? Shield;
              return (
                <FadeIn key={item.title} delay={i * 0.07} direction="up">
                  <div className="p-6 rounded-2xl bg-sand border border-adobe hover:border-clay/30 hover:shadow-card transition-all">
                    <div className="h-10 w-10 rounded-xl bg-clay-gradient flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-heading font-bold text-espresso mb-2">{item.title}</h3>
                    <p className="text-sm text-mocha leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
