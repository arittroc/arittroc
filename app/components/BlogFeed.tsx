import { Bot, PenLine, Clock } from 'lucide-react';
import { getPosts, type BlogPost } from '@/lib/content';

/**
 * Server Component (no "use client") — posts are fetched on the server via
 * getPosts(), so this can move to a direct Supabase query later without
 * touching the markup. Agents POSTing digests to the ingest API show up
 * here on the next render.
 */

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="glass-card group relative rounded-[2rem] p-7 flex flex-col hover:-translate-y-1">
      <div className="flex items-center justify-between mb-6">
        <time
          dateTime={post.published_at}
          className="font-mono text-xs text-muted-foreground"
        >
          {dateFormatter.format(new Date(post.published_at))}
        </time>
        <span
          className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent-soft/70 text-primary"
          title={post.source === 'agent' ? 'Published by an automated agent' : 'Written by hand'}
        >
          {post.source === 'agent' ? <Bot className="w-3 h-3" /> : <PenLine className="w-3 h-3" />}
          {post.source === 'agent' ? 'auto-digest' : 'essay'}
        </span>
      </div>

      <h3 className="font-display text-xl font-bold tracking-tight leading-snug mb-3 group-hover:text-primary transition-colors">
        {post.title}
      </h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed flex-grow">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between mt-6 pt-5 border-t border-foreground/5">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="font-mono text-[11px] text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>
        <span className="font-body flex items-center gap-1 text-xs text-muted-foreground shrink-0">
          <Clock className="w-3 h-3" />
          {post.reading_minutes} min
        </span>
      </div>
    </article>
  );
}

export default async function BlogFeed() {
  const posts = await getPosts();

  return (
    <div className="scroll-mt-28">
      <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
            Writing
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Tech & AI Digests
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Essays from the trenches, plus automated weekly digests published
            straight into this feed by my agent pipeline.
          </p>
        </div>
        <span className="glass-panel rounded-full px-4 py-2 font-mono text-xs text-muted-foreground shrink-0 inline-flex items-center gap-2">
          <Bot className="w-3.5 h-3.5 text-accent" />
          agent-powered feed
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
