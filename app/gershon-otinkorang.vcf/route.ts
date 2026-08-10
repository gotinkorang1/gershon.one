import { site } from "@/lib/site";

export const dynamic = "force-static";

function escapeVCard(value: string) {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll("\n", "\\n")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,");
}

function revisionTimestamp(value: string) {
  return new Date(value).toISOString().replaceAll("-", "").replaceAll(":", "").replace(".000", "");
}

export function GET() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCard("Otinkorang")};${escapeVCard("Gershon")};${escapeVCard("Adjei")};;`,
    `FN:${escapeVCard(site.name)}`,
    `TITLE:${escapeVCard(site.role)}`,
    `EMAIL;TYPE=INTERNET,WORK:${site.email}`,
    `TEL;TYPE=CELL,VOICE:${site.phoneHref}`,
    `URL;TYPE=WORK:${site.url}`,
    `URL;TYPE=LinkedIn:${site.socials.linkedin}`,
    `NOTE:${escapeVCard(site.availability)}`,
    `SOURCE:${site.url}${site.contactCard.url}`,
    `UID:gershon-otinkorang@${new URL(site.url).hostname}`,
    `REV:${revisionTimestamp(site.contentUpdated)}`,
    "END:VCARD",
  ];

  return new Response(`${lines.join("\r\n")}\r\n`, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "Content-Disposition": `attachment; filename="${site.contactCard.fileName}"`,
      "Content-Type": "text/vcard; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
