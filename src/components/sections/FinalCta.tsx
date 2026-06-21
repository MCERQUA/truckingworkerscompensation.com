import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { SITE, CREDENTIALS } from "@/lib/site";
import { COPY } from "@/lib/content";
import { FadeIn } from "@/components/animations/FadeIn";
import { Award, Globe, Shield, BadgeCheck } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Award, Globe, Shield, BadgeCheck, ShieldCheck };

export function FinalCta() {
  return (
    <section className="py-20 md:py-28 bg-sand">
      <div className="container-wide">
        <FadeIn className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-extrabold text-espresso text-3xl sm:text-4xl md:text-5xl">{COPY.finalCta.heading}</h2>
          <p className="mt-4 lead">{COPY.finalCta.sub}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="btn-primary text-lg">
              {COPY.finalCta.cta} <ArrowRight className="h-5 w-5" />
            </Link>
            <a href={SITE.phoneHref} className="btn-secondary text-lg">
              <Phone className="h-5 w-5" />
              {SITE.phone}
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            {CREDENTIALS.map((c) => {
              const Icon = iconMap[c.icon] ?? ShieldCheck;
              return (
                <div key={c.label} className="flex items-center gap-2 text-sm font-heading font-semibold text-mocha">
                  <Icon className="h-5 w-5 text-clay" />
                  {c.label}
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
