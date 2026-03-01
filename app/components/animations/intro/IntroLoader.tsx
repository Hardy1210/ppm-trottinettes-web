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
  imageHref = '/textures/intro-texture.webp',
  brandYellow = '#FFC700',
}: IntroLoaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    // Bloquear scroll mientras dure el intro
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          // Restaurar scroll
          document.documentElement.style.overflow = prevHtmlOverflow;
          document.body.style.overflow = prevBodyOverflow;
          onComplete?.();
        },
      });

      // Estado inicial
      tl.set('[data-overlay]', { autoAlpha: 1 });
      tl.set('[data-wipe-image]', { scaleX: 0, transformOrigin: '0% 50%' });
      tl.set('[data-wipe-yellow]', { scaleX: 0, transformOrigin: '0% 50%' });

      // Overlay con “polígono” (rectángulo normal al inicio)
      tl.set('[data-overlay]', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      });

      // 1) Barrido imagen dentro del logo
      tl.to('[data-wipe-image]', { scaleX: 1, duration: 0.75 });

      // 2) Barrido amarillo dentro del logo (un pelín después)
      tl.to('[data-wipe-yellow]', { scaleX: 1, duration: 0.65 }, '>-0.15');

      // 3) Pequeña pausa para “leer” el logo ya amarillo
      tl.to({}, { duration: 0.18 });

      // 4) Cortina hacia abajo con polígono + desplazamiento (revela página)
      tl.to(
        '[data-overlay]',
        {
          duration: 0.9,
          yPercent: 105,
          ease: 'power4.inOut',
        },
        'reveal',
      );

      // Polígono (diagonal) mientras cae
      tl.to(
        '[data-overlay]',
        {
          duration: 0.9,
          clipPath: 'polygon(0% 8%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'power2.inOut',
        },
        'reveal',
      );

      // Ocultar al final (por si queda algo)
      tl.set('[data-overlay]', { autoAlpha: 0 });
    }, rootRef);

    return () => {
      ctx.revert();
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      data-overlay
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      aria-hidden="true"
    >
      {/* El logo se “revela” SOLO dentro de la forma gracias al mask */}
      <svg
        className="w-[240px] max-w-[70vw] select-none"
        viewBox="0 0 800 200"
        role="img"
        aria-label="Intro logo"
      >
        <defs>
          {/* Pattern de imagen para la 1ra cortina */}
          <pattern
            id="imgPattern"
            patternUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            {/* Ajusta preserveAspectRatio según tu textura */}
            <image
              href={imageHref}
              x="0"
              y="0"
              width="800"
              height="200"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>

          {/* Máscara: aquí pones TU LOGO como forma blanca */}
          <mask id="logoMask">
            {/* Fondo negro = transparente (no muestra nada) */}
            <rect width="800" height="200" fill="black" />

            {/* IMPORTANTE:
               Reemplaza este <text> por tu SVG real del logo.
               La regla: lo que sea BLANCO en la máscara = visible.
            */}
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

        {/* Grupo “relleno” que solo se ve dentro del logo */}
        <g mask="url(#logoMask)">
          {/* 1) Cortina imagen: rect que “crece” horizontalmente */}
          <rect
            data-wipe-image
            x="0"
            y="0"
            width="800"
            height="200"
            fill="url(#imgPattern)"
          />

          {/* 2) Cortina amarilla: encima, también con wipe */}
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
  );
}
