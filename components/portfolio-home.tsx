import type { RoleFocusId } from "@/lib/site";
import { RoleFocusProvider } from "@/components/role-focus-provider";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { CaseStudies } from "@/components/sections/case-studies";
import { Skills } from "@/components/sections/skills";
import { Credentials } from "@/components/sections/credentials";
import { References } from "@/components/sections/references";
import { Contact } from "@/components/sections/contact";
import { SectionDivider } from "@/components/fx/section-divider";
import { RecruiterPackBanner } from "@/components/sections/recruiter-pack-banner";
import { SystemsLabTeaser } from "@/components/sections/systems-lab-teaser";

export function PortfolioHome({ focus = null }: { focus?: RoleFocusId | null }) {
  return (
    <RoleFocusProvider focus={focus}>
      <Hero />
      {focus && <RecruiterPackBanner focus={focus} />}
      <SectionDivider />
      <Experience key={focus ?? "overview"} />
      <SectionDivider />
      <CaseStudies />
      <SectionDivider />
      <SystemsLabTeaser />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Credentials />
      <SectionDivider />
      {/* Self-hides until real references exist; when present it owns its own
          trailing divider so the section rhythm stays intact. */}
      <References />
      <Contact />
    </RoleFocusProvider>
  );
}
