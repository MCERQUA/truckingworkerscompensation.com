"use client";

import { useState } from "react";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { COPY, US_STATES, QUOTE_SERVICE_TYPES, COMPANY_TYPES, YEARS_OPTIONS } from "@/lib/content";
import { SITE } from "@/lib/site";
import { CheckCircle2, Send } from "lucide-react";

const WEBHOOK_URL = "https://josh.jam-bot.com/social-api/api/leads/webhook/netlify?tenant=josh&site=truckingworkerscompensation.com";

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        body: data,
      });
    } catch {}
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <SmoothScroll>
      <Navbar />
      <main className="pt-28">
        <section className="py-16 bg-warm-radial">
          <div className="container-wide max-w-2xl mx-auto">
            <FadeIn className="text-center mb-10">
              <p className="section-eyebrow mb-3">{COPY.quote.eyebrow}</p>
              <h1 className="font-heading font-extrabold text-espresso text-4xl sm:text-5xl">{COPY.quote.heading}</h1>
              <p className="mt-4 lead">{COPY.quote.sub}</p>
            </FadeIn>

            {submitted ? (
              <FadeIn>
                <div className="card-base p-10 text-center">
                  <CheckCircle2 className="h-16 w-16 text-clay mx-auto mb-4" />
                  <h2 className="font-heading font-extrabold text-espresso text-2xl mb-2">Quote Request Received!</h2>
                  <p className="text-mocha">A trucking WC specialist will contact you within 1 hour during business hours. For urgent needs, call us directly at <a href={SITE.phoneHref} className="text-clay font-bold">{SITE.phone}</a>.</p>
                </div>
              </FadeIn>
            ) : (
              <FadeIn>
                <form
                  name="quote"
                  onSubmit={handleSubmit}
                  className="card-base p-8 space-y-5"
                >
                  <input type="hidden" name="form-name" value="quote" />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-heading font-bold text-espresso mb-1.5">Full Name *</label>
                      <input name="name" type="text" required placeholder="John Smith" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-bold text-espresso mb-1.5">Company Name *</label>
                      <input name="businessName" type="text" required placeholder="Smith Trucking LLC" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-heading font-bold text-espresso mb-1.5">Email *</label>
                      <input name="email" type="email" required placeholder="john@smithtrucking.com" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-bold text-espresso mb-1.5">Phone *</label>
                      <input name="phone" type="tel" required placeholder="(555) 000-0000" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-heading font-bold text-espresso mb-1.5">State *</label>
                      <select name="state" required className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition bg-white">
                        <option value="">Select state...</option>
                        {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-bold text-espresso mb-1.5">Company Type *</label>
                      <select name="companyType" required className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition bg-white">
                        <option value="">Select type...</option>
                        {COMPANY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-heading font-bold text-espresso mb-1.5">Number of Drivers *</label>
                      <input name="numberOfDrivers" type="number" required min="1" placeholder="e.g. 5" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-bold text-espresso mb-1.5">DOT Number (if any)</label>
                      <input name="dotNumber" type="text" placeholder="e.g. 1234567" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-heading font-bold text-espresso mb-1.5">Coverage Needed</label>
                      <select name="coverageType" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition bg-white">
                        <option value="">Select coverage...</option>
                        {QUOTE_SERVICE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-bold text-espresso mb-1.5">Years in Business</label>
                      <select name="yearsInBusiness" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition bg-white">
                        <option value="">Select...</option>
                        {YEARS_OPTIONS.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-heading font-bold text-espresso mb-1.5">Additional Notes</label>
                    <textarea name="message" rows={3} placeholder="Tell us about your fleet, loss history, or any special coverage needs..." className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition resize-none" />
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full text-base">
                    {loading ? "Submitting..." : <><Send className="h-5 w-5" />Request My Free Quote</>}
                  </button>
                  <p className="text-xs text-mocha text-center">We respond within 1 hour during business hours. No spam, ever.</p>
                </form>
              </FadeIn>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
