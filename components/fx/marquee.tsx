"use client";

import { useI18n } from "@/components/locale-provider";
import { getSkillGroups } from "@/lib/localised-content";

/**
 * A slow, endless ribbon of the toolkit under the hero — a scannable index of
 * everything the capability cards below go into. Pure CSS: the track is
 * rendered twice and translated by its own width, so the loop is seamless.
 * The duplicate is hidden from assistive tech, it pauses on hover or focus,
 * and under reduced motion it becomes a static, wrapped list.
 */
export function Marquee() {
  const { t, locale } = useI18n();
  const skills = [...new Set(getSkillGroups(locale).flatMap((group) => group.skills))];

  const track = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="marquee-track py-1">
      {skills.map((skill) => (
        <li
          key={skill}
          className="whitespace-nowrap rounded-full border border-border bg-surface-1/70 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur-sm"
        >
          {skill}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="shell">
      <div role="region" aria-label={t.nav.capabilities} tabIndex={0} className="marquee rounded-full">
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
