"use client";

import ParallaxBackground from "@/components/ParallaxBackground/ParallaxBackground";
import Scanlines from "@/components/Scanlines/Scanlines";
import NavBar from "@/components/NavBar/NavBar";
import HeroAbout from "@/components/HeroAbout/HeroAbout";
import SkillsExperience from "@/components/SkillsExperience/SkillsExperience";
import ProjectsAndArcade from "@/components/ProjectsAndArcade/ProjectsAndArcade";
import Testimonials from "@/components/Testimonials/Testimonials";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import TerminalOverlay from "@/components/TerminalOverlay/TerminalOverlay";
import SoundToggle from "@/components/SoundToggle/SoundToggel";
import { GlobalStyles } from "@/components/GlobalStyles/GlobalStyles";

export default function Page() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <ParallaxBackground />
      <Scanlines />
      <NavBar />
      <HeroAbout />
      <SkillsExperience />
      <ProjectsAndArcade />
      <Testimonials />
      <Contact />
      <Footer />
      <TerminalOverlay />
      <SoundToggle />
      <GlobalStyles />
    </div>
  );
}
