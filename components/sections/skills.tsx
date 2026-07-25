import { SectionHeading } from "@/components/fx/section-heading";
import { Reveal } from "@/components/fx/reveal";
import { skillGroups } from "@/lib/site";

export function Skills() {
  return (
    <section id="capabilities" className="shell scroll-mt-20 py-24 md:py-36">
      <SectionHeading
        index="02"
        title="Capabilities"
        description="Grouped by what they are actually used for, in rough order of how central they are to the current role."
      />

      <div className="mt-16">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={0.03 * i}>
            <div className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-rule py-8 md:gap-x-12">
              <p className="label col-span-12 pt-1.5 md:col-span-2">
                {String(i + 1).padStart(2, "0")}
              </p>

              <div className="col-span-12 md:col-span-4">
                <h3 className="text-xl font-medium tracking-tight">{group.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {group.blurb}
                </p>
              </div>

              <ul className="col-span-12 flex flex-wrap gap-x-6 gap-y-2.5 self-start md:col-span-6">
                {group.skills.map((skill) => (
                  <li key={skill} className="text-sm text-muted-foreground">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-rule" />
      </div>
    </section>
  );
}
