'use client";'

import { MonitorPlay } from "lucide-react";
import Section from "../Section/Section";
import ProjectCard from "../ProjectCard/ProjectCard";
import Arcade from "../Arcade/Arcade";


export default function ProjectsAndArcade() {
  return (
    <Section id="projects" className="py-24">
      <h2 className="text-3xl font-black mb-8 flex items-center gap-2">
        <MonitorPlay className="h-6 w-6" /> Projects & Mini-Arcade
      </h2>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
        <div className="space-y-5">
          {[1, 2, 3].map((i) => (
            <ProjectCard key={i} i={i} />
          ))}
        </div>

        <Arcade />
      </div>
    </Section>
  );
}
