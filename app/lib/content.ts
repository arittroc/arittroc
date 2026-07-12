/**
 * Central content layer.
 *
 * Every shape here mirrors the relational schema planned for Supabase
 * (`projects`, `experience`, `blog_posts` tables), so swapping this file
 * for live queries — or letting an n8n/agent pipeline POST rows in — is a
 * drop-in change, not a refactor.
 */

/* ── Identity ─────────────────────────────────────────────────── */

export const IDENTITY = {
  name: 'Arittro C.',
  brand: 'arittro',
  brandSuffix: '.c',
  tagline: 'SaaS & Cloud Engineer',
  email: 'work.arittroc@gmail.com',
  github: 'https://github.com/arittroc',
  linkedin: 'https://www.linkedin.com/in/arittroc',
} as const;

/* ── Projects ─────────────────────────────────────────────────── */

export interface Project {
  id: string;
  title: string;
  summary: string;
  /** framework / infra badges shown on the card */
  stack: string[];
  /** omit while a project has no public repo/domain yet — ProjectsGrid hides the icon instead of rendering a broken link */
  githubUrl?: string;
  liveUrl?: string;
  /** lucide icon key, resolved inside ProjectsGrid */
  icon: 'radar' | 'scale' | 'home' | 'scan' | 'mountain';
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 'releasepilot',
    title: 'ReleasePilot',
    summary:
      'Cloud-native incident response platform monitoring infrastructure health — automated runbooks, on-call escalation, and real-time service topology.',
    stack: ['Go', 'Kubernetes', 'React', 'Grafana'],
    githubUrl: 'https://github.com/arittroc/release-pilot',
    liveUrl: 'https://releasepilot.dev',
    icon: 'radar',
    featured: true,
  },
  {
    id: 'ledgerzero',
    title: 'LedgerZero',
    summary:
      'B2B SaaS system for automated bank reconciliation pipelines — ingests statements, matches ledger entries, and flags exceptions with full audit trails.',
    stack: ['TypeScript', 'PostgreSQL', 'Kafka', 'Temporal'],
    githubUrl: 'https://github.com/arittroc/LedgerZero',
    liveUrl: 'https://ledgerzero.app',
    icon: 'scale',
  },
  {
    id: 'house-price-oracle',
    title: 'House Price Oracle',
    summary:
      'Real estate prediction application powered by a FastAPI deployment — localized market features feed a versioned model registry behind a clean REST edge.',
    stack: ['Python', 'FastAPI', 'scikit-learn', 'Docker'],
    githubUrl: 'https://github.com/arittroc/end-to-end-mlops-pipeline',
    liveUrl: 'https://oracle.arittro.dev',
    icon: 'home',
  },
  {
    id: 'vera',
    title: 'Vera',
    summary:
      'An advanced Retrieval-Augmented Generation (RAG) system utilizing Optical Character Recognition (OCR) to extract, process, and query complex document data.',
    stack: ['Python', 'OCR', 'RAG', 'LLMs', 'Vector DB'],
    githubUrl: 'https://github.com/arittroc/vera',
    // liveUrl intentionally omitted — not yet deployed
    icon: 'scan',
  },
  {
    id: 'atmospheric-altitude-ascent',
    title: 'Atmospheric Altitude Ascent',
    summary:
      'A scroll-driven WebGL 3D experience simulating the ascent to Nathu La Pass. Features a synchronized GSAP/Lenis camera rig, dynamic procedural weather systems, and a custom glassmorphic HUD.',
    stack: ['React Three Fiber', 'Three.js', 'GSAP', 'Tailwind'],
    githubUrl: 'https://github.com/arittroc/-Atmospheric-Altitude-Ascent',
    // liveUrl intentionally omitted — not yet deployed
    icon: 'mountain',
  },
];

/* ── Experience (bento) ───────────────────────────────────────── */

export interface ExpertiseArea {
  id: string;
  title: string;
  description: string;
  icon: 'cloud' | 'server' | 'database' | 'workflow';
  points: string[];
}

export const EXPERTISE: ExpertiseArea[] = [
  {
    id: 'cloud',
    title: 'Cloud Setups',
    description:
      'Production-grade cloud architecture from VPC design to zero-downtime delivery.',
    icon: 'cloud',
    points: ['CI/CD pipelines', 'Blue-green deploys', 'Cost-aware scaling'],
  },
  {
    id: 'homelab',
    title: 'Home-Server Management',
    description:
      'Years of extensive self-hosted operations — a live lab for everything I ship.',
    icon: 'server',
    points: ['k3s clusters', 'NGINX reverse proxies', 'Uptime monitoring'],
  },
  {
    id: 'data',
    title: 'Data Normalization',
    description:
      'Scalable relational schemas that stay fast and truthful as products grow.',
    icon: 'database',
    points: ['Schema design', 'Migration pipelines', 'Query optimization'],
  },
  {
    id: 'ai',
    title: 'AI Logic Gates',
    description:
      'Complex automated decision flows where LLM judgment meets deterministic guardrails.',
    icon: 'workflow',
    points: ['Agentic workflows', 'n8n orchestration', 'LLM routing & evals'],
  },
];

export interface Milestone {
  year: string;
  label: string;
}

export const MILESTONES: Milestone[] = [
  { year: '2024', label: 'First production deploys' },
  { year: '2025', label: 'Home-lab k3s cluster & data platform work' },
  { year: '2026', label: 'AI automation & independent SaaS engineering' },
];

/* ── Blog ─────────────────────────────────────────────────────── */

/**
 * Mirrors the `blog_posts` table row shape 1:1. Backend agents POST this
 * exact payload to the ingest endpoint; the feed renders whatever lands.
 */
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  published_at: string; // ISO 8601, as stored in Postgres
  reading_minutes: number;
  source: 'human' | 'agent';
}

export const SEED_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: 'incident-response-toil',
    title: 'Killing Incident-Response Toil with Runbook Automation',
    excerpt:
      'How ReleasePilot turned 2 a.m. pages into self-healing workflows — and the escalation logic that decides when a human still gets woken up.',
    tags: ['SRE', 'Kubernetes', 'Automation'],
    published_at: '2026-06-28T09:00:00Z',
    reading_minutes: 7,
    source: 'human',
  },
  {
    id: 2,
    slug: 'bank-reconciliation-pipelines',
    title: 'Designing Reconciliation Pipelines That Auditors Trust',
    excerpt:
      'Idempotent ingestion, deterministic matching, and the exception queue pattern behind LedgerZero — a schema walkthrough.',
    tags: ['PostgreSQL', 'Fintech', 'Data'],
    published_at: '2026-05-14T09:00:00Z',
    reading_minutes: 9,
    source: 'human',
  },
  {
    id: 3,
    slug: 'ai-digest-pipeline',
    title: 'This Blog Posts Itself: An Agent-to-API Content Pipeline',
    excerpt:
      'The n8n + LLM digest workflow that compiles weekly tech briefs and publishes them straight into this feed over a single POST endpoint.',
    tags: ['AI Agents', 'n8n', 'Next.js'],
    published_at: '2026-04-02T09:00:00Z',
    reading_minutes: 6,
    source: 'agent',
  },
];

/**
 * Server-side data access seam for the blog feed (called from the
 * BlogFeed Server Component). Point BLOG_API_URL at the ingest API —
 * or replace the body with a direct Supabase query — and the component
 * consuming it never changes.
 */
export async function getPosts(): Promise<BlogPost[]> {
  const endpoint = process.env.BLOG_API_URL;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, { next: { revalidate: 300 } });
      if (res.ok) return (await res.json()) as BlogPost[];
    } catch {
      /* fall through to seed content */
    }
  }
  return SEED_POSTS;
}

/* ── Demo form ────────────────────────────────────────────────── */

export const SERVICE_TYPES = [
  'SaaS MVP Build',
  'Cloud Infrastructure & DevOps',
  'AI Automation & Agents',
  'Data Engineering',
  'Something Else',
] as const;

export interface DemoRequest {
  name: string;
  email: string;
  serviceType: (typeof SERVICE_TYPES)[number] | '';
  message: string;
}
