"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { SERVICE_TYPES, type DemoRequest } from '@/lib/content';
import { closeDemoModal, useDemoModalOpen } from '@/lib/demo-modal-store';
import { submitDemoForm } from '@/actions/submit-demo';

/**
 * "Book a Demo" overlay. Mounted once from page.tsx with no props —
 * visibility comes from the demo-modal store (Navbar/Hero call
 * openDemoModal()). Submission runs through the submitDemoForm Server
 * Action, which POSTs to the n8n webhook server-side (keeping the URL
 * out of the client bundle and sidestepping browser CORS) and appends a
 * row to the target Google Sheet.
 */

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY_FORM: DemoRequest = { name: '', email: '', serviceType: '', message: '' };

const inputClasses =
  'w-full glass-panel font-body rounded-2xl px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/50 ' +
  'focus:ring-2 focus:ring-accent/30 focus:border-accent/30 transition-all bg-white/70';

export default function DemoModal() {
  const open = useDemoModalOpen();
  const [form, setForm] = useState<DemoRequest>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>('idle');
  const nameRef = useRef<HTMLInputElement>(null);

  // Escape to close + scroll lock while open
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDemoModal();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  // Fresh form every time the modal opens
  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM);
      setStatus('idle');
      requestAnimationFrame(() => nameRef.current?.focus());
    }
  }, [open]);

  const set = <K extends keyof DemoRequest>(key: K, value: DemoRequest[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    try {
      await submitDemoForm(form);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-modal-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/25 backdrop-blur-md"
            onClick={closeDemoModal}
          />

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg glass-panel rounded-[2rem] p-8 md:p-10 max-h-[90vh] overflow-y-auto bg-white/75"
          >
            <button
              onClick={closeDemoModal}
              aria-label="Close"
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {status === 'success' ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-14 h-14 text-accent mx-auto mb-6" />
                <h3 className="font-display text-2xl font-bold tracking-tight mb-3">
                  Request received
                </h3>
                <p className="font-body text-muted-foreground mb-8 max-w-sm mx-auto">
                  Thanks, {form.name.split(' ')[0] || 'there'} — I'll get back to
                  you within 24 hours to line up the demo.
                </p>
                <button
                  onClick={closeDemoModal}
                  className="glass-button font-body px-7 py-3 rounded-full text-sm font-semibold"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3">
                  Book a demo
                </p>
                <h3
                  id="demo-modal-title"
                  className="font-display text-3xl font-bold tracking-tight mb-2"
                >
                  Let's scope your build.
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-8">
                  A 30-minute walkthrough of what I'd ship for you — no decks,
                  just working systems.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-1.5">
                      <span className="font-body text-xs font-semibold text-foreground/70">
                        Name
                      </span>
                      <input
                        ref={nameRef}
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                        placeholder="Ada Lovelace"
                        className={inputClasses}
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-body text-xs font-semibold text-foreground/70">
                        Email
                      </span>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        placeholder="ada@company.com"
                        className={inputClasses}
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-1.5">
                    <span className="font-body text-xs font-semibold text-foreground/70">
                      Project / service type
                    </span>
                    <select
                      required
                      value={form.serviceType}
                      onChange={(e) =>
                        set('serviceType', e.target.value as DemoRequest['serviceType'])
                      }
                      className={`${inputClasses} appearance-none cursor-pointer ${
                        form.serviceType ? '' : 'text-muted-foreground/60'
                      }`}
                    >
                      <option value="" disabled>
                        What are we building?
                      </option>
                      {SERVICE_TYPES.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="font-body text-xs font-semibold text-foreground/70">
                      Message
                    </span>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      placeholder="Tell me about the product, the timeline, and where it hurts today…"
                      className={`${inputClasses} resize-none`}
                    />
                  </label>

                  {status === 'error' && (
                    <p className="font-body flex items-center gap-2 text-sm text-red-600 bg-red-50/80 border border-red-100 rounded-xl px-4 py-3">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      Something went wrong on the wire — try again, or email me directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="glass-button font-body mt-2 px-7 py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Request Demo
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
