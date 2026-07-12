'use client';

import { useSyncExternalStore } from 'react';

/**
 * Minimal external store for the "Book a Demo" overlay.
 *
 * page.tsx stays a Server Component and mounts <Navbar/>, <Hero/>, and
 * <DemoModal/> without props, so the open/close state can't live there.
 * Any client component calls openDemoModal(); DemoModal subscribes via
 * useDemoModalOpen(). No context provider, no prop drilling.
 */

let isOpen = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function openDemoModal() {
  isOpen = true;
  emit();
}

export function closeDemoModal() {
  isOpen = false;
  emit();
}

export function useDemoModalOpen(): boolean {
  // Server snapshot is always false: the overlay never renders in SSR HTML.
  return useSyncExternalStore(
    subscribe,
    () => isOpen,
    () => false,
  );
}
