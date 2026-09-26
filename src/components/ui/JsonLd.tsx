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
      streetAddress: "12220 E Riggs Rd",
      addressLocality: "Chandler",
      addressRegion: "AZ",
      postalCode: "85249",
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
