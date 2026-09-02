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
                      <input name="phone" type="tel" required placeholder="844-967-5247" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" />
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

                  <div className="space-y-4 pt-5 border-t border-adobe">
                    <div>
                      <h3 className="font-heading font-bold text-sm uppercase tracking-wider">Business details</h3>
                      <p className="text-xs opacity-70 mt-0.5">What the business does and how long it has been running.</p>
                    </div>
                    <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Year business started</label><input type="text" name="yearBusinessStarted" placeholder="2015" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                    <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Description of the business</label><textarea name="businessDescription" rows={3} placeholder="What the business does, day to day" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Annual gross sales</label><input type="text" name="annualGrossSales" placeholder="$1,200,000" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Residential vs commercial split</label><input type="text" name="residentialVsCommercial" placeholder="70% residential / 30% commercial" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                    </div>
                    <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">New vs existing construction</label><input type="text" name="newVsExistingConstruction" placeholder="Mostly existing structures" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                    <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Largest projects</label><textarea name="largestProjects" rows={3} placeholder="Three largest jobs in the last year — value and scope" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                  </div>

                  <div className="space-y-4 pt-5 border-t border-adobe">
                    <div>
                      <h3 className="font-heading font-bold text-sm uppercase tracking-wider">Business address</h3>
                      <p className="text-xs opacity-70 mt-0.5">Where your operation is based.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Street address</label><input type="text" name="streetAddress" placeholder="123 Main St, Suite 200" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">City</label><input type="text" name="city" placeholder="Phoenix" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                    </div>
                    <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">ZIP code</label><input type="text" name="zip" placeholder="85001" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                  </div>

                  <div className="space-y-4 pt-5 border-t border-adobe">
                    <div>
                      <h3 className="font-heading font-bold text-sm uppercase tracking-wider">Payroll and class codes</h3>
                      <p className="text-xs opacity-70 mt-0.5">Employees, payroll and how the work is classified.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Number of employees</label><input type="text" name="numberOfEmployees" placeholder="8" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Amount of payroll</label><input type="text" name="amountOfPayroll" placeholder="$420,000" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Class code 1</label><input type="text" name="classCode1" placeholder="5403" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Class code 2</label><input type="text" name="classCode2" placeholder="5645" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Class code 3</label><input type="text" name="classCode3" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Class code 4</label><input type="text" name="classCode4" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Class code 5</label><input type="text" name="classCode5" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Office vs field split</label><input type="text" name="officeVsFieldSplit" placeholder="2 office / 6 field" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Any clerical staff?</label><select name="hasClericalStaff" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition"><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select></div>
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Clerical staff — count and payroll</label><input type="text" name="clericalStaffCount" placeholder="2 clerical, $90,000 payroll" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Any outside sales staff?</label><select name="hasSalesStaff" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition"><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select></div>
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Sales staff — count and payroll</label><input type="text" name="salesStaffCount" placeholder="1 outside sales, $60,000 payroll" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-5 border-t border-adobe">
                    <div>
                      <h3 className="font-heading font-bold text-sm uppercase tracking-wider">Prior year</h3>
                      <p className="text-xs opacity-70 mt-0.5">Your last completed 12 months. Best estimates are fine.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Prior year gross sales</label><input type="text" name="priorYearGrossSales" placeholder="$1,200,000" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Prior year subcontractor expenses</label><input type="text" name="priorYearSubcontractorExpenses" placeholder="$250,000" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Prior year employee count</label><input type="text" name="priorYearEmployeeCount" placeholder="8" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Prior year employee payroll</label><input type="text" name="priorYearEmployeePayroll" placeholder="$400,000" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-5 border-t border-adobe">
                    <div>
                      <h3 className="font-heading font-bold text-sm uppercase tracking-wider">Next twelve months — estimates</h3>
                      <p className="text-xs opacity-70 mt-0.5">Projected figures for the coming policy period.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Estimated gross sales</label><input type="text" name="estimatedGrossSales" placeholder="$1,400,000" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Estimated subcontractor expenses</label><input type="text" name="estimatedSubcontractorExpenses" placeholder="$300,000" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Estimated employee count</label><input type="text" name="estimatedEmployeeCount" placeholder="10" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Estimated employee payroll</label><input type="text" name="estimatedEmployeePayroll" placeholder="$500,000" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                    </div>
                    <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Estimated material costs</label><input type="text" name="estimatedMaterialCosts" placeholder="$180,000" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                  </div>

                  <div className="space-y-4 pt-5 border-t border-adobe">
                    <div>
                      <h3 className="font-heading font-bold text-sm uppercase tracking-wider">Subcontractor insurance</h3>
                      <p className="text-xs opacity-70 mt-0.5">How subcontracted work is covered.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Do your subcontractors carry their own insurance?</label><select name="subcontractorsHaveInsurance" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition"><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select></div>
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Percentage of subcontractors insured</label><input type="text" name="percentSubcontractorsInsured" placeholder="100" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                    </div>
                    <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Do you need coverage for uninsured subcontractors?</label><select name="coverageForUninsuredSubcontractors" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition"><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select></div>
                  </div>

                  <div className="space-y-4 pt-5 border-t border-adobe">
                    <div>
                      <h3 className="font-heading font-bold text-sm uppercase tracking-wider">Current or prior coverage</h3>
                      <p className="text-xs opacity-70 mt-0.5">Who covers you today, if anyone.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Current or prior carrier</label><input type="text" name="priorCarrierName" placeholder="Carrier name" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Policy number</label><input type="text" name="priorPolicyNumber" placeholder="Policy number" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                    </div>
                    <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Policy expiration date</label><input type="date" name="priorPolicyExpiration" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                  </div>

                  <div className="space-y-4 pt-5 border-t border-adobe">
                    <div>
                      <h3 className="font-heading font-bold text-sm uppercase tracking-wider">Owners and officers</h3>
                      <p className="text-xs opacity-70 mt-0.5">Each owner or officer to be included or excluded.</p>
                    </div>
                    <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Owners and officers</label><textarea name="ownerNames" rows={3} placeholder="One owner or officer per line, with role" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Owner date of birth</label><input type="date" name="ownerDateOfBirth" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                      <div><label className="block text-sm font-heading font-bold text-espresso mb-1.5">Ownership percentage</label><input type="text" name="ownerOwnershipPct" placeholder="100" className="w-full rounded-xl border border-adobe px-4 py-3 text-espresso placeholder:text-mocha/50 focus:outline-none focus:border-clay focus:ring-2 focus:ring-clay/10 transition" /></div>
                    </div>
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
