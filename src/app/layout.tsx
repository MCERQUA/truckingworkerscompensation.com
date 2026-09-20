import type { Metadata } from "next";
import { bodyFont, headingFont } from "@/lib/fonts";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/ui/JsonLd";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${SITE.name} | DOT Compliance & Fleet WC`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | DOT Compliance & Fleet WC`,
    description: SITE.description,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | DOT Compliance & Fleet WC`,
    description: SITE.description,
    images: ["/images/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <head><JsonLd /></head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
