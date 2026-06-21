import { STATS } from "@/lib/site";
import { FadeIn } from "@/components/animations/FadeIn";

export function Stats() {
  return (
    <section className="py-16 bg-clay">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.08} direction="up">
              <div className="text-center">
                <p className="font-heading font-extrabold text-white text-4xl md:text-5xl">{stat.value}</p>
                <p className="mt-2 text-white/70 text-sm font-medium">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
