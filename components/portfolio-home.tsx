import type { RoleFocusId } from "@/lib/site";
import { RoleFocusProvider } from "@/components/role-focus-provider";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { CaseStudies } from "@/components/sections/case-studies";
import { Skills } from "@/components/sections/skills";
import { Credentials } from "@/components/sections/credentials";
import { Contact } from "@/components/sections/contact";
import { SectionDivider } from "@/components/fx/section-divider";

export function PortfolioHome({ focus = null }: { focus?: RoleFocusId | null }) {
  return (
    <RoleFocusProvider focus={focus}>
      <Hero />
      <SectionDivider />
      <Experience key={focus ?? "overview"} />
      <SectionDivider />
      <CaseStudies />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Credentials />
      <SectionDivider />
      <Contact />
    </RoleFocusProvider>
  );
}
