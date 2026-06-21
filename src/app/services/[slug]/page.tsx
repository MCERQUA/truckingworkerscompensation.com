import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone, Truck, UserCheck, ClipboardCheck, BarChart3, Ghost, MapPin, Layers, Zap } from "lucide-react";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { SERVICES, SITE } from "@/lib/site";
import { SERVICE_DETAIL, COPY } from "@/lib/content";

const iconMap: Record<string, React.ElementType> = {
  Truck, UserCheck, ClipboardCheck, BarChart3, Ghost, MapPin, Layers, Zap,
};

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | Trucking Workers Compensation`,
    description: service.description,
    keywords: service.keywords,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();
  const detail = SERVICE_DETAIL[slug];
  if (!detail) notFound();

  const Icon = iconMap[service.icon] ?? Truck;

  return (
    <SmoothScroll>
      <Navbar />
      <main className="pt-28">
        <section className="py-16 bg-warm-radial">
          <div className="container-wide max-w-4xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-2xl bg-clay-gradient flex items-center justify-center shadow-warm">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="section-eyebrow">Trucking WC Coverage</p>
                  <h1 className="font-heading font-extrabold text-espresso text-3xl sm:text-4xl">{service.title}</h1>
                </div>
              </div>
              <p className="lead">{detail.heroBlurb}</p>
            </FadeIn>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-wide max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <FadeIn direction="left" className="md:col-span-2 space-y-10">
              <div>
                <h2 className="font-heading font-bold text-espresso text-2xl mb-5">{COPY.serviceDetail.whatsCovered}</h2>
                <ul className="space-y-3">
                  {detail.whatsCovered.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-clay flex-shrink-0 mt-0.5" />
                      <span className="text-mocha">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-heading font-bold text-espresso text-2xl mb-5">{COPY.serviceDetail.whoFor}</h2>
                <ul className="space-y-3">
                  {detail.whoItsFor.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-gold-dark flex-shrink-0 mt-0.5" />
                      <span className="text-mocha">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="right" className="space-y-6">
              <div className="card-base p-6">
                <h3 className="font-heading font-bold text-espresso mb-4">{COPY.serviceDetail.whyCca}</h3>
                <ul className="space-y-3">
                  {detail.whyCca.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-mocha">
                      <CheckCircle2 className="h-4 w-4 text-clay flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-clay p-6 text-white">
                <p className="font-heading font-bold text-lg mb-3">{COPY.serviceDetail.cta}</p>
                <Link href="/quote" className="btn-gold w-full mb-3">
                  Get a Quote <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={SITE.phoneHref} className="btn-secondary !bg-white/10 !border-white/20 !text-white hover:!bg-white/20 w-full">
                  <Phone className="h-4 w-4" />{SITE.phone}
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {detail.faqs.length > 0 && (
          <FaqAccordion faqs={detail.faqs} limit={10} />
        )}
      </main>
      <Footer />
    </SmoothScroll>
  );
}
