import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { CaseStudies } from "@/components/sections/case-studies";
import { Skills } from "@/components/sections/skills";
import { Credentials } from "@/components/sections/credentials";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <CaseStudies />
      <Skills />
      <Credentials />
      <Contact />
    </>
  );
}
