'use client";'

import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 60]);
  const y2 = useTransform(scrollY, [0, 800], [0, 120]);
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ y: y2 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.12),transparent_60%)]" />
      </motion.div>
      <motion.canvas
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-60 pixelated"
        style={{ y: y1 }}
        ref={(node) => {
          if (!node) return;
          const ctx = node.getContext("2d")!;
          const resize = () => {
            node.width = window.innerWidth;
            node.height = window.innerHeight;
          };
          resize();
          const dots = Array.from({ length: 140 }, () => ({
            x: Math.random() * node.width,
            y: Math.random() * node.height,
            s: 1 + Math.random() * 1.5,
            vy: 0.1 + Math.random() * 0.4,
          }));
          let raf = 0;
          const step = () => {
            ctx.clearRect(0, 0, node.width, node.height);
            ctx.fillStyle = "rgba(255,255,255,0.05)";
            dots.forEach((d) => {
              d.y += d.vy;
              if (d.y > node.height) d.y = -4;
              ctx.fillRect(d.x, d.y, d.s, d.s);
            });
            raf = requestAnimationFrame(step);
          };
          step();
          const onR = () => resize();
          window.addEventListener("resize", onR);
          return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onR);
          };
        }}
      />
    </>
  );
}
