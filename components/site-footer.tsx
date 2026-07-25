import Link from "next/link";
import { site, navLinks } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="shell border-t border-rule py-12">
      <div className="grid gap-x-12 gap-y-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-lg font-medium tracking-tight">{site.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{site.role}</p>
        </div>

        <nav className="md:col-span-3">
          <p className="label">Sections</p>
          <ul className="mt-3 space-y-1.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link text-sm text-muted-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="label">Contact</p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            <li>
              <a href={`mailto:${site.email}`} className="link">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phoneHref}`} className="link">
                {site.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-2 border-t border-rule pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="label">Accra, Ghana → St. John&apos;s, NL</p>
      </div>
    </footer>
  );
}
