'use client";'

import Section from "../Section/Section";
import ConsoleFrame from "../ConsoleFrame/ConsoleFrame";
import TerminalTimeline from "../TerminalTimeline/TerminalTimeline";
import Skill3D from "../Skill3D/Skill3D";

export default function SkillsExperience() {
  const skills = [
    { label: "React", hint: "Hooks, RSC, Suspense" },
    { label: "Next.js", hint: "App Router, ISR, Edge" },
    { label: "TypeScript", hint: "Strict, util types" },
    { label: "Node.js", hint: "Fastify, Workers" },
    { label: "Tailwind", hint: "Design systems" },
    { label: "AI/ML", hint: "LLMs, RAG, on-device" },
    { label: "Cloud", hint: "AWS, GCP, Vercel" },
    { label: "DevOps", hint: "CI/CD, Docker" },
  ];

  const timeline = [
    { year: "2025", line: "Built AI assistants + pixel arcade portfolio" },
    { year: "2024", line: "Scaled Next.js apps to millions of views" },
    { year: "2023", line: "Shipped healthcare & finance dashboards" },
  ];

  return (
    <Section id="skills" className="py-20">
      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
        <div>
          <h2 className="text-3xl font-black mb-6">Skills — Hover & Click</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {skills.map((s, i) => (
              <Skill3D key={i} label={s.label} hint={s.hint} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-black mb-3">Experience (Terminal)</h3>
          <ConsoleFrame title="dev@terminal — history">
            <TerminalTimeline timeline={timeline} />
          </ConsoleFrame>
        </div>
      </div>
    </Section>
  );
}
