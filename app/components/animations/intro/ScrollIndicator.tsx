'use client';

import { useEffect, useRef, useState } from 'react';

type ScrollIndicatorProps = {
  color?: string; // amarillo
  borderColor?: string; // borde
  width?: number; // px
  hideAfterMs?: number;
  minHeight?: number; // px
  offset?: number; // separación del borde derecho
};

export default function ScrollIndicator({
  color = '#FFC700',
  borderColor = 'rgba(0,0,0,0.9)',
  width = 10,
  hideAfterMs = 1200,
  minHeight = 28,
  offset = 0,
}: ScrollIndicatorProps) {
  const [visible, setVisible] = useState(false);
  const [top, setTop] = useState(0);
  const [height, setHeight] = useState(minHeight);
  const tRef = useRef<number | null>(null);

  useEffect(() => {
    const calc = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight;
      const clientHeight = doc.clientHeight;

      const maxScroll = Math.max(1, scrollHeight - clientHeight);
      const progress = scrollTop / maxScroll;

      // Altura del thumb proporcional a la cantidad de contenido
      const rawH = (clientHeight / scrollHeight) * clientHeight;
      const h = Math.max(minHeight, Math.floor(rawH));

      const maxTop = clientHeight - h;
      const t = Math.floor(progress * maxTop);

      setHeight(h);
      setTop(t);
    };

    const show = () => {
      setVisible(true);
      if (tRef.current) window.clearTimeout(tRef.current);
      tRef.current = window.setTimeout(() => setVisible(false), hideAfterMs);
    };

    const onScroll = () => {
      calc();
      show();
    };

    // init
    calc();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', calc, { passive: true });
    window.addEventListener('wheel', show, { passive: true });
    window.addEventListener('touchmove', show, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', calc);
      window.removeEventListener('wheel', show);
      window.removeEventListener('touchmove', show);
      if (tRef.current) window.clearTimeout(tRef.current);
    };
  }, [hideAfterMs, minHeight]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        right: offset,
        height: '100vh',
        width: width,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: 'opacity 200ms ease',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top,
          right: 0,
          width: width,
          height,
          background: color,
          border: `2px solid ${borderColor}`,
          borderRadius: 999,
          boxSizing: 'border-box',
          transform: 'translateZ(0)',
        }}
      />
    </div>
  );
}
