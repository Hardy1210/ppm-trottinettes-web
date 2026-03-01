'use client';

import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';

type IntroLoaderProps = {
  onComplete?: () => void;
  // textura/imagen para la 1ra cortina (solo dentro del logo)
  imageHref?: string; // ejemplo: "/textures/intro-texture.jpg"
  brandYellow?: string; // ejemplo: "#FFD400"
};

export function IntroLoader({
  onComplete,
  imageHref = '/images/intro-texture.webp',
  brandYellow = '#FFC700',
}: IntroLoaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    // ✅ Bloqueo sin layout shift (no ocultamos scrollbar)
    const scrollY = window.scrollY;

    const prev = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflowY: document.body.style.overflowY,
    };

    // Importante: NO tocar html/body overflow aquí.
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    // opcional: por seguridad
    document.body.style.overflowY = 'scroll';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          // ✅ Restaurar
          document.body.style.position = prev.position;
          document.body.style.top = prev.top;
          document.body.style.left = prev.left;
          document.body.style.right = prev.right;
          document.body.style.width = prev.width;
          document.body.style.overflowY = prev.overflowY;

          window.scrollTo(0, scrollY);
          onComplete?.();
        },
      });

      // Estado inicial
      tl.set('[data-curtain]', { autoAlpha: 1, yPercent: 0 });
      tl.set('[data-logo-wrap]', { autoAlpha: 1 });

      tl.set('[data-wipe-image]', { scaleX: 0, transformOrigin: '0% 50%' });
      tl.set('[data-wipe-yellow]', { scaleX: 0, transformOrigin: '0% 50%' });

      // Cortina como rectángulo al inicio
      tl.set('[data-curtain]', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      });

      // 1) Barrido imagen
      tl.to('[data-wipe-image]', { scaleX: 1, duration: 0.75 });

      // 2) Barrido amarillo
      tl.to('[data-wipe-yellow]', { scaleX: 1, duration: 0.65 }, '>-0.15');

      // 3) pausa
      tl.to({}, { duration: 0.18 });

      // (opcional) el logo puede empezar a desvanecerse justo antes del reveal
      tl.to('[data-logo-wrap]', { autoAlpha: 0, duration: 0.25 }, 'reveal');

      // 4) Cortina baja
      tl.to(
        '[data-curtain]',
        { duration: 0.9, yPercent: 105, ease: 'power4.inOut' },
        'reveal',
      );

      // 5) Polígono mientras cae
      tl.to(
        '[data-curtain]',
        {
          duration: 1.5,
          clipPath: 'polygon(0% 8%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'power4.inOut',
        },
        'reveal',
      );

      // Al final, oculta cortina
      tl.set('[data-curtain]', { autoAlpha: 0 });

      // Ocultar al final (por si queda algo)
      tl.set('[data-overlay]', { autoAlpha: 0 });
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.position = prev.position;
      document.body.style.top = prev.top;
      document.body.style.left = prev.left;
      document.body.style.right = prev.right;
      document.body.style.width = prev.width;
      document.body.style.overflowY = prev.overflowY;
      window.scrollTo(0, scrollY);
    };
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-9999 pointer-events-none"
      aria-hidden="true"
    >
      {/* CORTINA NEGRA (esta se anima hacia abajo con polígono) */}
      <div data-curtain className="absolute inset-0 bg-black" />

      {/* LOGO centrado (puedes fade out) */}
      <div
        data-logo-wrap
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg
          className="w-[240px] max-w-[70vw] select-none"
          viewBox="0 0 800 200"
          role="img"
          aria-label="Intro logo"
        >
          {/* ... defs igual ... */}
          <defs>
            <pattern
              id="imgPattern"
              patternUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                href={imageHref}
                x="0"
                y="0"
                width="800"
                height="200"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>

            <mask id="logoMask">
              <rect width="800" height="200" fill="black" />
              <text
                x="50%"
                y="58%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="120"
                fontFamily="Arial Black, Arial"
                fill="white"
                letterSpacing="2"
              >
                KALE
              </text>
            </mask>
          </defs>

          <g mask="url(#logoMask)">
            <rect
              data-wipe-image
              x="0"
              y="0"
              width="800"
              height="200"
              fill="url(#imgPattern)"
            />
            <rect
              data-wipe-yellow
              x="0"
              y="0"
              width="800"
              height="200"
              fill={brandYellow}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
