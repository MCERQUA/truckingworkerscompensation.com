import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { COPY } from "@/lib/content";
import { FadeIn } from "@/components/animations/FadeIn";

export function CtaBand() {
  return (
    <section className="py-16 bg-espresso relative overflow-hidden">
      <div className="absolute inset-0 bg-gold-stripe opacity-50" />
      <div className="absolute top-0 inset-x-0 h-px horizon-band" />
      <div className="container-wide relative">
        <FadeIn className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-heading font-extrabold text-white text-2xl sm:text-3xl">{COPY.ctaBand.heading}</h2>
            <p className="text-white/70 mt-2">{COPY.ctaBand.sub}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a href={SITE.phoneHref} className="btn-secondary !bg-white/10 !border-white/20 !text-white hover:!bg-white/20">
              <Phone className="h-4 w-4" />{SITE.phone}
            </a>
            <Link href="/quote" className="btn-gold">
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
