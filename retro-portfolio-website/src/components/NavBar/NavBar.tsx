'use client";'

import { Github, Linkedin, Mail } from "lucide-react";
import IconLink from "../IconLink/IconLink";
import Section from "../Section/Section";

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur bg-black/40 border-b border-white/10">
      <Section className="flex h-14 items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-grid place-items-center h-8 w-8 rounded-lg bg-white text-black font-black text-lg shadow-[0_0_0_3px_#000]">
            8
          </span>
          <div className="text-sm uppercase tracking-[0.25em] text-white/70">
            DevQuest
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#skills" className="nav-link">
            Skills
          </a>
          <a href="#projects" className="nav-link">
            Projects
          </a>
          <a href="#testimonials" className="nav-link">
            Testimonials
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </div>
        <div className="flex items-center gap-2">
          <IconLink Icon={Github} href="#" label="GitHub" />
          <IconLink Icon={Linkedin} href="#" label="LinkedIn" />
          <IconLink Icon={Mail} href="#contact" label="Email" />
        </div>
      </Section>
    </nav>
  );
}
