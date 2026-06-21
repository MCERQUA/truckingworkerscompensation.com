import { SITE } from "@/lib/site";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "3901 N. Federal Highway, Suite 200",
      addressLocality: "Fort Lauderdale",
      addressRegion: "FL",
      postalCode: "33308",
      addressCountry: "US",
    },
    areaServed: "US",
    serviceType: "Workers Compensation Insurance",
    foundingDate: SITE.founded,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
