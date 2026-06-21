import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site";
import { COPY } from "@/lib/content";
import { FadeIn } from "@/components/animations/FadeIn";

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-sand">
      <div className="container-wide">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <p className="section-eyebrow mb-3">{COPY.testimonials.eyebrow}</p>
          <h2 className="font-heading font-extrabold text-espresso text-3xl sm:text-4xl md:text-5xl">{COPY.testimonials.heading}</h2>
          <p className="mt-4 lead">{COPY.testimonials.sub}</p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.08}>
              <div className="card-base p-6 flex flex-col h-full">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-sm text-mocha leading-relaxed flex-1 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 pt-5 border-t border-adobe">
                  <p className="font-heading font-bold text-espresso text-sm">{t.name}</p>
                  <p className="text-xs text-mocha">{t.company} · {t.state}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
