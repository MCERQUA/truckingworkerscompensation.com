"use client";

import { useState } from "react";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { COPY } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send } from "lucide-react";

const WEBHOOK_URL = "https://josh.jam-bot.com/social-api/api/leads/webhook/netlify?tenant=josh&site=truckingworkerscompensation.com";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [sendFailed, setSendFailed] = useState(false);

  function toBody(data: FormData): URLSearchParams {
    const body = new URLSearchParams();
    data.forEach((value, key) => {
      if (typeof value === "string") body.append(key, value);
    });
    return body;
  }

  // Primary path: the leads webhook (urlencoded; multipart is answered 200 but dropped).
  // Success only if the webhook says ok:true and stored is not false.
  async function postWebhook(data: FormData): Promise<boolean> {
    try {
      const res = await fetch(WEBHOOK_URL, { method: "POST", body: toBody(data) });
      if (!res.ok) return false;
      const j = await res.json().catch(() => null);
      return !!j && j.ok === true && j.stored !== false;
    } catch {
      return false;
    }
  }

  // Fallback: Netlify Forms (registered in public/__forms.html).
  async function postNetlifyForms(data: FormData): Promise<boolean> {
    try {
      const body = toBody(data);
      if (!body.has("form-name")) body.set("form-name", "contact");
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSendFailed(false);
    const data = new FormData(e.currentTarget);
    const ok = (await postWebhook(data)) || (await postNetlifyForms(data));
    if (ok) setSubmitted(true);
    else setSendFailed(true);
    setLoading(false);
  }

  return (
    <SmoothScroll>
      <Navbar />
      <main className="pt-28">
        <section className="py-16 bg-warm-radial">
          <div className="container-wide">
            <FadeIn className="text-center max-w-2xl mx-auto mb-12">
              <p className="section-eyebrow mb-3">{COPY.contact.eyebrow}</p>
              <h1 className="font-heading font-extrabold text-espresso text-4xl sm:text-5xl">{COPY.contact.heading}</h1>
              <p className="mt-4 lead">{COPY.contact.sub}</p>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <FadeIn direction="left">
                <div className="space-y-6">
                  {[
                    { icon: Phone, label: "Phone", value: SITE.phone, href: SITE.phoneHref },
                    { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
                    { icon: MapPin, label: "Address", value: SITE.address },
                    { icon: Clock, label: "Hours", value: "Mon–Fri 8am–5pm MST" },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-adobe">
                      <div className="h-10 w-10 rounded-xl bg-clay-gradient flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-heading font-bold text-mocha uppercase tracking-wider mb-0.5">{label}</p>
                        {href ? (
                          <a href={href} className="font-heading font-bold text-clay hover:text-clay-dark transition-colors">{value}</a>
                        ) : (
                          <p className="font-heading font-semibold text-espresso">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn direction="right">
                {submitted ? (
                  <div className="card-base p-10 text-center h-full flex flex-col items-center justify-center">
                    <CheckCircle2 className="h-14 w-14 text-clay mx-auto mb-4" />
                    <h2 className="font-heading font-extrabold text-espresso text-xl mb-2">Message Sent!</h2>
                    <p className="text-mocha">We&apos;ll get back to you within 1 business hour.</p>
                  </div>
                ) : (
                  <form name="contact" onSubmit={handleSubmit} className="card-base p-8 space-y-5">
                    <input type="hidden" name="form-name" value="contact" />
                    <div>
                      <label className="block text-sm font-heading font-bold text-espresso mb-1.5">Name *</label>
                      <input name="name" type="text" required placeholder="Your name" className="w-full rounded-xl border border-adobe px-4 py-3 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-bold text-espresso mb-1.5">Email *</label>
                      <input name="email" type="email" required placeholder="your@email.com" className="w-full rounded-xl border border-adobe px-4 py-3 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-bold text-espresso mb-1.5">Phone</label>
                      <input name="phone" type="tel" placeholder="844-967-5247" className="w-full rounded-xl border border-adobe px-4 py-3 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-bold text-espresso mb-1.5">Message *</label>
                      <textarea name="message" required rows={4} placeholder="How can we help your trucking operation?" className="w-full rounded-xl border border-adobe px-4 py-3 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition resize-none" />
                    </div>
                    {sendFailed && (
                      <div role="alert" className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                        <p className="font-bold">We could not send your message.</p>
                        <p>Nothing was submitted. Please try again in a moment, or call us at <a href={SITE.phoneHref} className="font-bold underline">{SITE.phone}</a>.</p>
                      </div>
                    )}
                    <button type="submit" disabled={loading} className="btn-primary w-full">
                      {loading ? "Sending..." : <><Send className="h-4 w-4" />Send Message</>}
                    </button>
                  </form>
                )}
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
