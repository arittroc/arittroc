"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { IDENTITY } from '@/lib/content';
import { openDemoModal } from '@/lib/demo-modal-store';

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Blog', href: '#blog' },
];

const CONNECT_ACTIONS = [
  {
    label: 'Email',
    sublabel: IDENTITY.email,
    href: `mailto:${IDENTITY.email}`,
    icon: Mail,
  },
  {
    label: 'LinkedIn',
    sublabel: 'in/arittroc',
    href: IDENTITY.linkedin,
    icon: LinkedinIcon,
  },
  {
    label: 'GitHub',
    sublabel: '@arittroc',
    href: IDENTITY.github,
    icon: GithubIcon,
  },
];

function ConnectMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1 hover:text-primary transition-colors focus:outline-none focus-visible:text-primary"
      >
        Connect
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute top-full mt-4 left-1/2 -translate-x-1/2 glass-panel rounded-2xl p-2 w-64 flex flex-col gap-1"
          >
            {CONNECT_ACTIONS.map((action) => (
              <a
                key={action.label}
                role="menuitem"
                href={action.href}
                target={action.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/70 transition-colors"
              >
                <span className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-primary shrink-0">
                  <action.icon className="w-4 h-4" />
                </span>
                <span className="flex flex-col min-w-0">
                  <span className="font-body text-sm font-semibold">{action.label}</span>
                  <span className="font-body text-xs text-muted-foreground truncate">
                    {action.sublabel}
                  </span>
                </span>
                <ArrowUpRight className="w-4 h-4 ml-auto text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-4 md:top-6 inset-x-4 md:inset-x-0 md:left-1/2 md:-translate-x-1/2 z-50 md:w-full md:max-w-4xl"
    >
      <nav className="glass-panel rounded-3xl md:rounded-full px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="#top" className="font-display font-bold tracking-tight text-lg shrink-0">
          {IDENTITY.brand}
          <span className="text-gradient">{IDENTITY.brandSuffix}</span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-7 font-body text-sm font-medium text-foreground/80">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
          <ConnectMenu />
        </div>

        {/* Right interaction area */}
        <div className="flex items-center gap-2">
          <button
            onClick={openDemoModal}
            className="glass-button font-body px-4 md:px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 group"
          >
            Book a Demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="md:hidden p-2 rounded-full hover:bg-white/70 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden glass-panel rounded-3xl mt-2 p-4 flex flex-col gap-1"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-body px-3 py-2.5 rounded-xl font-medium hover:bg-white/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-foreground/10 my-2" />
            {CONNECT_ACTIONS.map((action) => (
              <a
                key={action.label}
                href={action.href}
                target={action.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/70 transition-colors"
              >
                <action.icon className="w-4 h-4 text-primary" />
                <span className="font-body text-sm font-medium">{action.label}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
