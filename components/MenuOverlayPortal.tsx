'use client';

import { ReactNode, useSyncExternalStore } from 'react';
import ReactDOM from 'react-dom';

function subscribe() {
  // No necesitamos suscripción real; devolvemos un unsubscribe vacío.
  return () => {};
}

function getSnapshot() {
  return document.getElementById('modal-root');
}

function getServerSnapshot() {
  return null;
}

export function MenuOverlayPortal({ children }: { children: ReactNode }) {
  const root = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!root) return null;
  return ReactDOM.createPortal(children, root);
}
