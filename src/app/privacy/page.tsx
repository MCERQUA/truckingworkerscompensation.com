import type { Metadata } from "next";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container-wide max-w-3xl mx-auto py-12">
          <h1 className="font-heading font-extrabold text-espresso text-4xl mb-6">Privacy Policy</h1>
          <div className="prose prose-lg text-mocha">
            <p>Last updated: January 1, 2026</p>
            <p>{SITE.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when you visit our website.</p>
            <h2>Information We Collect</h2>
            <p>We collect information you provide directly, including name, contact details, and business information submitted through our quote and contact forms.</p>
            <h2>How We Use Your Information</h2>
            <p>We use collected information to provide insurance quotes, respond to inquiries, and improve our services. We do not sell your personal information to third parties.</p>
            <h2>Contact Us</h2>
            <p>Questions? Email us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call {SITE.phone}.</p>
          </div>
        </div>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
