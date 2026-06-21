import { SERVICES, LOCATIONS } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const base = "https://truckingworkerscompensation.com";
  const posts = getAllPosts();

  const staticPages = [
    { url: base, priority: "1.0", changefreq: "weekly" },
    { url: `${base}/services`, priority: "0.9", changefreq: "weekly" },
    { url: `${base}/coverage`, priority: "0.8", changefreq: "monthly" },
    { url: `${base}/blog`, priority: "0.8", changefreq: "weekly" },
    { url: `${base}/about`, priority: "0.7", changefreq: "monthly" },
    { url: `${base}/quote`, priority: "0.9", changefreq: "monthly" },
    { url: `${base}/contact`, priority: "0.7", changefreq: "monthly" },
    { url: `${base}/privacy`, priority: "0.3", changefreq: "yearly" },
    { url: `${base}/terms`, priority: "0.3", changefreq: "yearly" },
  ];

  const servicePages = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    priority: "0.8",
    changefreq: "monthly",
  }));

  const locationPages = LOCATIONS.map((l) => ({
    url: `${base}/locations/${l.slug}`,
    priority: "0.7",
    changefreq: "monthly",
  }));

  const blogPages = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    priority: "0.6",
    changefreq: "yearly",
  }));

  const allPages = [...staticPages, ...servicePages, ...locationPages, ...blogPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((p) => `  <url>
    <loc>${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
