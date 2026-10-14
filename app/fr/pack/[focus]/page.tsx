import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackView } from "@/components/pack/pack-view";
import { isRoleFocusId } from "@/lib/role-focus";
import { roleFocusProfiles } from "@/lib/site";
import { getFeatures, getRoleFocusProfiles } from "@/lib/localised-content";

type Props = { params: Promise<{ focus: string }> };

export function generateStaticParams() {
  return roleFocusProfiles.map(({ id }) => ({ focus: id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { focus } = await params;
  if (!isRoleFocusId(focus)) return {};
  const profile = getRoleFocusProfiles("fr").find((p) => p.id === focus);
  if (!profile) return {};
  const copy = getFeatures("fr").recruiterPack;
  return {
    title: copy.metaTitle(profile.title),
    description: `${copy.lede} ${profile.description}`,
    alternates: {
      canonical: `/fr/pack/${profile.id}`,
      languages: { "en-CA": `/pack/${profile.id}`, "fr-CA": `/fr/pack/${profile.id}` },
    },
    robots: { index: false, follow: true },
  };
}

export default async function RecruiterPackPage({ params }: Props) {
  const { focus } = await params;
  if (!isRoleFocusId(focus)) notFound();
  return <PackView focus={focus} locale="fr" />;
}
