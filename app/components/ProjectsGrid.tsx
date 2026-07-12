"use client";

import { motion } from 'framer-motion';
import {
  ExternalLink,
  Radar,
  Scale,
  Home,
  ScanText,
  type LucideIcon,
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { PROJECTS, type Project } from '@/lib/content';

const ICONS: Record<Project['icon'], LucideIcon> = {
  radar: Radar,
  scale: Scale,
  home: Home,
  scan: ScanText,
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = ICONS[project.icon];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: 'easeOut' }}
      className={`glass-card group relative overflow-hidden rounded-[2rem] p-8 flex flex-col hover:-translate-y-1.5 hover:scale-[1.01] ${
        project.featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* hover wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex items-start justify-between mb-8">
        <span className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center text-primary">
          <Icon className="w-6 h-6" />
        </span>
        <span className="flex gap-1">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source on GitHub`}
              className="p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/70 transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live site`}
              className="p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/70 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </span>
      </div>

      <div className="relative z-10 flex-grow">
        <h3 className="font-display text-2xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="font-body text-muted-foreground leading-relaxed text-sm max-w-prose">
          {project.summary}
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2 mt-8">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-xs px-3 py-1 rounded-full bg-accent-soft/70 text-primary border border-accent/10"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function ProjectsGrid() {
  return (
    <div className="scroll-mt-28">
      <div className="mb-14 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
          Case studies
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Selected Work
        </h2>
        <p className="font-body text-lg text-muted-foreground">
          Production-tier platforms — each one designed, shipped, and operated
          end to end.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
