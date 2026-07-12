import React, { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { IDENTITY } from '../lib/content';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Wire to the same n8n pipeline as the demo form when ready.
    console.info('[Footer] subscribe:', email);
    setSubscribed(true);
  };

  return (
    <footer className="mt-12 border-t border-foreground/5">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-2">
              Subscribe to the AI & Tech Digest
            </h3>
            <p className="text-muted-foreground mb-6">
              Essays and agent-compiled briefs, straight from the pipeline to
              your inbox.
            </p>
            {subscribed ? (
              <p className="inline-flex items-center gap-2 glass rounded-full px-5 py-3 text-sm font-medium text-primary">
                <Check className="w-4 h-4" />
                You're on the list — first digest lands soon.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="relative flex max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  aria-label="Email address"
                  className="w-full glass rounded-full pl-6 pr-36 py-4 text-sm outline-none focus:ring-2 focus:ring-accent/25 placeholder:text-muted-foreground/50 transition-all bg-white/70"
                />
                <button
                  type="submit"
                  className="glass-button absolute right-1.5 top-1.5 bottom-1.5 px-5 rounded-full text-sm font-semibold flex items-center gap-1.5"
                >
                  Subscribe
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col md:items-end gap-5">
            <div className="font-display font-bold tracking-tight text-xl">
              {IDENTITY.brand}
              <span className="text-gradient">{IDENTITY.brandSuffix}</span>
            </div>
            <div className="flex gap-2">
              <a
                href={`mailto:${IDENTITY.email}`}
                aria-label="Email"
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={IDENTITY.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={IDENTITY.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {IDENTITY.name} — built with a
              violet obsession.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
