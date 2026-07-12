"use client";

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, FolderOpen } from 'lucide-react';
import { openDemoModal } from '@/lib/demo-modal-store';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section id="top" className="pt-40 md:pt-48 pb-16 px-6 flex flex-col items-center text-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl flex flex-col items-center"
      >
        <motion.span
          variants={item}
          className="glass-panel font-body px-4 py-2 rounded-full text-sm font-medium text-primary mb-8 inline-flex items-center gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          Open for Q3 2026 engagements
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display text-5xl md:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          Ideas shipped as
          <br />
          <span className="text-gradient">production SaaS.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="font-body text-lg md:text-2xl text-muted-foreground font-normal max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I design, build, and operate cloud platforms end to end — distributed
          systems, data pipelines, and AI automation that hold up in production.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            onClick={openDemoModal}
            className="glass-button font-body px-7 py-3.5 rounded-full font-semibold flex items-center gap-2 group"
          >
            Book a Demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <Link
            href="#projects"
            className="glass-panel font-body px-7 py-3.5 rounded-full font-semibold flex items-center gap-2 hover:border-accent/30 transition-colors"
          >
            <FolderOpen className="w-4 h-4 text-primary" />
            View Projects
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
