'use client";'

import Section from "../Section/Section";
import { motion, useScroll, useTransform } from "framer-motion";
import TypeLines from "../TypeLines/TypeLines";
import { Rocket, TerminalSquare } from "lucide-react";
import NeonCard from "../NeonCard/NeonCard";
import Progress from "../Progress/Progress";
import HoloKV from "../HoloKV/HoloKV";
import { Sound } from "@/utils/constants";

export default function HeroAbout() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div id="about" className="relative">
      <Section className="py-16 sm:py-24">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-6xl font-black leading-tight">
              Modern <span className="text-cyan-300">Retro</span> Portfolio for
              a<span className="text-fuchsia-300"> Software Developer</span>
            </h1>
            <TypeLines
              lines={[
                "Initializing profile…",
                "Loading modules: nextjs, ts, ai, arcade…",
                "System ready.",
              ]}
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="rounded-2xl bg-lime-300 text-black hover:bg-lime-200 p-2 flex align-items-center"
                onMouseEnter={() => Sound.play(Sound.beep)}
              >
                <Rocket className="h-4 w-4 mr-2" />
                Hire Me
              </button>
              <button
                className="rounded-2xl bg-white/10 hover:bg-white/20 p-2 flex align-items-center"
                onMouseEnter={() => Sound.play(Sound.beep)}
              >
                <TerminalSquare className="h-4 w-4 mr-2" />
                Download CV
              </button>
            </div>
          </motion.div>

          <motion.div style={{ y }}>
            <NeonCard>
              <div className="grid grid-cols-2 gap-4 p-6">
                <div className="col-span-2">
                  <div className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Hologram Resume
                  </div>
                  <div className="text-2xl font-black">RETRO RUNTIME v2.1</div>
                </div>
                <HoloKV k="Name" v="Hariom Sharma" />
                <HoloKV k="Role" v="Full-Stack Dev" />
                <HoloKV k="Focus" v="Next.js • AI • Edge" />
                <HoloKV k="Location" v="Jaipur, IN" />
                <div className="col-span-2">
                  <Progress label="Frontend" value={92} />
                  <Progress label="Backend" value={85} />
                  <Progress label="AI/ML" value={74} />
                </div>
              </div>
            </NeonCard>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
