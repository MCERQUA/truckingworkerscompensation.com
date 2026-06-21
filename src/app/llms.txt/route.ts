import { SITE, SERVICES } from "@/lib/site";

export async function GET() {
  const content = `# ${SITE.name}
> ${SITE.description}

## Contact
- Phone: ${SITE.phone}
- Email: ${SITE.email}
- Address: ${SITE.address}
- NPN: ${SITE.npn}
- Founded: ${SITE.founded}

## Services
${SERVICES.map((s) => `- **${s.title}**: ${s.shortDesc}`).join("\n")}

## Coverage
Licensed in all 50 states. Specializes in workers' compensation for trucking companies, owner-operators, OTR drivers, and fleets.

## About
${SITE.name} is a division of Contractors Choice Agency, a national specialty insurance brokerage founded in 2003. We specialize in transportation workers' compensation.
`;
  return new Response(content, { headers: { "Content-Type": "text/plain" } });
}
