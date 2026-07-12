import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Ingest endpoint for the Google Opal / n8n content pipeline. An agent
 * POSTs a compiled tech digest here; on success it lands directly in the
 * `blog_posts` table and the next BlogFeed render (see app/lib/content.ts,
 * BLOG_API_URL) picks it up.
 *
 * Auth: `Authorization: Bearer <OPAL_AGENT_SECRET>`. The service-role key
 * is used server-side only, so this route — not client code — is what's
 * allowed to bypass RLS.
 */

interface BlogIngestPayload {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // markdown body
  category: string;
}

function isAuthorized(req: Request): boolean {
  const secret = process.env.OPAL_AGENT_SECRET;
  if (!secret) return false;

  const header = req.headers.get('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : header;
  return token === secret;
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await req.json()) as Partial<BlogIngestPayload>;
    const { title, slug, excerpt, content, category } = body;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error('Supabase server credentials are not configured');
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data, error } = await supabase
      .from('blog_posts')
      .insert({ title, slug, excerpt, content, category })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ post: data }, { status: 201 });
  } catch (err) {
    console.error('[api/blog] ingest failed:', err);
    return NextResponse.json({ error: 'Failed to ingest post' }, { status: 500 });
  }
}
