import { PROCESS } from "@/lib/content";
import { COPY } from "@/lib/content";
import { FadeIn } from "@/components/animations/FadeIn";

export function Process() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="container-wide">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <p className="section-eyebrow mb-3">{COPY.process.eyebrow}</p>
          <h2 className="font-heading font-extrabold text-espresso text-3xl sm:text-4xl md:text-5xl">{COPY.process.heading}</h2>
          <p className="mt-4 lead">{COPY.process.sub}</p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-adobe to-transparent" aria-hidden />
          {PROCESS.map((step, i) => (
            <FadeIn key={step.step} delay={i * 0.1} direction="up">
              <div className="text-center relative">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-clay-gradient shadow-warm text-white font-heading font-extrabold text-2xl mb-5 mx-auto">
                  {step.step}
                </div>
                <h3 className="font-heading font-bold text-espresso text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-mocha leading-relaxed">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
