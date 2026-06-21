"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations/FadeIn";
import { COPY, HOME_FAQS } from "@/lib/content";

export function FaqAccordion({ faqs = HOME_FAQS, limit = 10 }: { faqs?: { q: string; a: string }[]; limit?: number }) {
  const [open, setOpen] = useState<number | null>(0);
  const displayed = faqs.slice(0, limit);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-wide max-w-3xl mx-auto">
        <FadeIn className="text-center mb-12">
          <p className="section-eyebrow mb-3">{COPY.faq.eyebrow}</p>
          <h2 className="font-heading font-extrabold text-espresso text-3xl sm:text-4xl">{COPY.faq.heading}</h2>
          <p className="mt-4 lead">{COPY.faq.sub}</p>
        </FadeIn>

        <div className="space-y-3">
          {displayed.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.03}>
              <div className={cn("rounded-2xl border transition-all duration-200", open === i ? "border-clay/30 bg-clay/5" : "border-adobe bg-white hover:border-clay/20")}>
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="font-heading font-bold text-espresso text-base">{faq.q}</span>
                  <ChevronDown className={cn("h-5 w-5 text-clay flex-shrink-0 transition-transform duration-200", open === i ? "rotate-180" : "")} />
                </button>
                {open === i && (
                  <div className="px-6 pb-5">
                    <p className="text-mocha leading-relaxed text-sm">{faq.a}</p>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
