import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Truck, Award, Globe } from "lucide-react";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { CtaBand } from "@/components/sections/CtaBand";
import { COPY } from "@/lib/content";
import { SITE, STATS, CREDENTIALS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us | Trucking Workers Compensation",
  description: "20+ years insuring the trucking industry. We specialize in workers' comp for motor carriers, owner-operators, and OTR drivers.",
};

export default function AboutPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="pt-28">
        <section className="py-16 bg-warm-radial">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <FadeIn>
              <p className="section-eyebrow mb-3">{COPY.about.eyebrow}</p>
              <h1 className="font-heading font-extrabold text-espresso text-4xl sm:text-5xl">{COPY.about.heading}</h1>
              <p className="mt-4 lead">{COPY.about.sub}</p>
            </FadeIn>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
              <FadeIn direction="left">
                <div className="relative rounded-3xl overflow-hidden shadow-warm-lg">
                  <img src="/images/about.jpg" alt="Trucking WC specialists" className="w-full h-[400px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 bg-white/95 rounded-2xl p-4 shadow-warm">
                    <p className="font-heading font-extrabold text-espresso text-2xl">Founded {SITE.founded}</p>
                    <p className="text-xs text-mocha">Specialty trucking insurance since day one</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="right">
                <p className="text-mocha leading-relaxed text-lg">{COPY.about.body}</p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="p-5 rounded-2xl bg-sand border border-adobe text-center">
                      <p className="font-heading font-extrabold text-clay text-3xl">{stat.value}</p>
                      <p className="text-xs text-mocha mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {CREDENTIALS.map((c) => (
                    <div key={c.label} className="pill-clay">{c.label}</div>
                  ))}
                </div>

                <Link href="/quote" className="btn-primary mt-8 inline-flex">
                  Get a Free Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
