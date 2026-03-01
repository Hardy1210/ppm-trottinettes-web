'use client';

import { useEffect } from 'react';

export function useIntroScrollReset(setIntroDone: (v: boolean) => void) {
  useEffect(() => {
    // 1) Desactiva restauración automática del scroll
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2) Siempre empezar arriba
    window.scrollTo(0, 0);

    // 3) Manejar bfcache (volver atrás)
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        window.scrollTo(0, 0);
        setIntroDone(false);
      }
    };

    window.addEventListener('pageshow', onPageShow);

    return () => {
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [setIntroDone]);
}
