import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioHome } from "@/components/portfolio-home";
import { roleFocusProfiles, site } from "@/lib/site";
import { getRoleFocus, isRoleFocusId } from "@/lib/role-focus";

type Props = { params: Promise<{ focus: string }> };

export function generateStaticParams() {
  return roleFocusProfiles.map(({ id }) => ({ focus: id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { focus } = await params;
  if (!isRoleFocusId(focus)) return {};
  const profile = getRoleFocus(focus);
  if (!profile) return {};

  const path = `/for/${profile.id}`;
  const frenchPath = `/fr/for/${profile.id}`;
  return {
    title: profile.title,
    description: profile.description,
    alternates: {
      canonical: path,
      languages: { "en-CA": path, "fr-CA": frenchPath, "x-default": path },
    },
    openGraph: {
      type: "profile",
      url: path,
      title: `${profile.title} — ${site.shortName}`,
      description: profile.description,
      locale: "en_CA",
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.title} — ${site.shortName}`,
      description: profile.description,
    },
  };
}

export default async function FocusedPortfolioPage({ params }: Props) {
  const { focus } = await params;
  if (!isRoleFocusId(focus)) notFound();
  return <PortfolioHome focus={focus} />;
}
