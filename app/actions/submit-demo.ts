'use server';

import type { DemoRequest } from '@/lib/content';

/**
 * Server Action behind the "Book a Demo" form. Runs on the server, so the
 * n8n webhook URL never reaches the client bundle and the request isn't
 * subject to browser CORS. Without NEXT_PUBLIC_DEMO_WEBHOOK_URL configured
 * (local dev), it simulates success so the UX stays testable.
 */
export async function submitDemoForm(
  formData: DemoRequest,
): Promise<{ success: boolean }> {
  const webhook = process.env.NEXT_PUBLIC_DEMO_WEBHOOK_URL;
  const payload = { ...formData, submitted_at: new Date().toISOString() };

  if (!webhook) {
    console.info('[submitDemoForm] NEXT_PUBLIC_DEMO_WEBHOOK_URL not set; payload:', payload);
    return { success: true };
  }

  const res = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  return { success: true };
}
