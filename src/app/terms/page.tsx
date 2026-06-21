import type { Metadata } from "next";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container-wide max-w-3xl mx-auto py-12">
          <h1 className="font-heading font-extrabold text-espresso text-4xl mb-6">Terms of Service</h1>
          <div className="prose prose-lg text-mocha">
            <p>Last updated: January 1, 2026</p>
            <p>By using the {SITE.name} website, you agree to these terms. This website provides general insurance information and facilitates quote requests. It does not constitute a binding insurance contract or coverage confirmation.</p>
            <h2>Insurance Licensing</h2>
            <p>{SITE.name} is a division of Contractors Choice Agency, licensed in all 50 states. NPN #{SITE.npn}.</p>
            <h2>Disclaimer</h2>
            <p>Coverage descriptions are general in nature. Actual coverage is determined by the policy issued by the carrier. Always review your policy documents for complete terms.</p>
            <h2>Contact</h2>
            <p>Questions? Contact us at {SITE.email} or {SITE.phone}.</p>
          </div>
        </div>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
