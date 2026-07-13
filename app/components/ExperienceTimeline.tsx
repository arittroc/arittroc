"use client";

import { motion, type Variants } from 'framer-motion';
import {
  Cloud,
  Server,
  Database,
  Workflow,
  Check,
  type LucideIcon,
} from 'lucide-react';
import { EXPERTISE, MILESTONES, type ExpertiseArea } from '@/lib/content';

const ICONS: Record<ExpertiseArea['icon'], LucideIcon> = {
  cloud: Cloud,
  server: Server,
  database: Database,
  workflow: Workflow,
};

const tile: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

function ExpertiseTile({ area }: { area: ExpertiseArea }) {
  const Icon = ICONS[area.icon];
  return (
    <motion.div
      variants={tile}
      className="glass-card rounded-[2rem] p-7 flex flex-col hover:-translate-y-1"
    >
      <span className="w-11 h-11 rounded-2xl glass-panel flex items-center justify-center text-primary mb-5">
        <Icon className="w-5 h-5" />
      </span>
      <h3 className="font-display text-lg font-bold tracking-tight mb-2">{area.title}</h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5 flex-grow">
        {area.description}
      </p>
      <ul className="space-y-1.5">
        {area.points.map((point) => (
          <li key={point} className="font-body flex items-center gap-2 text-sm text-foreground/75">
            <Check className="w-3.5 h-3.5 text-accent shrink-0" />
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  return (
    <div className="scroll-mt-28">
      <div className="mb-14 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
          Track record
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Three Years, Full Stack to Bare Metal
        </h2>
        <p className="font-body text-lg text-muted-foreground">
          Seasoned across the whole delivery surface — from racking home-lab
          hardware to orchestrating AI decision systems in the cloud.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ staggerChildren: 0.08 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Headline stat tile */}
        <motion.div
          variants={tile}
          className="glass-card rounded-[2rem] p-8 md:col-span-2 relative overflow-hidden flex flex-col justify-between min-h-64"
        >
          <div
            className="absolute -right-16 -top-16 w-64 h-64 rounded-full opacity-60 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(142,45,226,0.18), transparent 70%)',
            }}
          />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground relative z-10">
            Since 2023
          </p>
          <div className="relative z-10">
            <div className="font-display text-7xl md:text-8xl font-extrabold tracking-tight text-gradient leading-none mb-4">
              3+ yrs
            </div>
            <p className="font-body text-muted-foreground leading-relaxed max-w-md">
              of executing cloud setups, running extensive home-server fleets,
              designing scalable data normalization schemes, and wiring complex
              automated AI logic gates into real products.
            </p>
          </div>
        </motion.div>

        <ExpertiseTile area={EXPERTISE[0]} />
        <ExpertiseTile area={EXPERTISE[1]} />
        <ExpertiseTile area={EXPERTISE[2]} />
        <ExpertiseTile area={EXPERTISE[3]} />

        {/* Timeline strip */}
        <motion.div
          variants={tile}
          className="glass-card rounded-[2rem] p-8 md:col-span-2 lg:col-span-3"
        >
          <div className="relative">
            <div className="absolute left-0 right-0 top-[7px] h-px bg-gradient-to-r from-primary/10 via-accent/40 to-primary/10" />
            <ol className="relative grid grid-cols-2 sm:grid-cols-4 gap-y-8">
              {MILESTONES.map((m) => (
                <li key={m.year} className="flex flex-col items-start pr-4">
                  <span className="w-[15px] h-[15px] rounded-full bg-background border-2 border-accent shadow-[0_0_12px_rgba(142,45,226,0.45)] mb-4" />
                  <span className="font-mono text-sm font-semibold text-primary mb-1">
                    {m.year}
                  </span>
                  <span className="font-body text-xs text-muted-foreground leading-snug">
                    {m.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
