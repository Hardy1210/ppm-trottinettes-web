'use client';

import { useIntro } from '@/context/IntroContext';
import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';

type IntroLoaderProps = {
  imageHref?: string;
  brandYellow?: string;
};

export function IntroLoader({
  imageHref = '/images/intro-texture.webp',
  brandYellow = '#e4e700',
}: IntroLoaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { setIntroDoneLogo } = useIntro();

  useLayoutEffect(() => {
    const scrollY = window.scrollY;

    const prev = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflowY: document.body.style.overflowY,
    };

    // lock scroll
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflowY = 'scroll';

    const ctx = gsap.context(() => {
      const curtain = rootRef.current?.querySelector('[data-curtain]');
      const logoWrap = rootRef.current?.querySelector('[data-logo-wrap]');

      const texA = rootRef.current?.querySelector<SVGRectElement>(
        '[data-layer="texA"]',
      );
      const texB = rootRef.current?.querySelector<SVGRectElement>(
        '[data-layer="texB"]',
      );
      const yellow = rootRef.current?.querySelector<SVGRectElement>(
        '[data-layer="yellow"]',
      );

      if (!curtain || !logoWrap || !texA || !texB || !yellow) return;

      // helper: poner una capa como "banda" lista para cruzar
      // helper: poner una capa como "banda" lista para caer
      const setBand = (el: SVGRectElement, rotation = -10) => {
        gsap.set(el, {
          opacity: 1,
          // ✅ empieza arriba (no izquierda)
          x: 0,
          y: -290,
          rotation,
          transformOrigin: '50% 50%',
          transformBox: 'fill-box',
        });
      };

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          document.body.style.position = prev.position;
          document.body.style.top = prev.top;
          document.body.style.left = prev.left;
          document.body.style.right = prev.right;
          document.body.style.width = prev.width;
          document.body.style.overflowY = prev.overflowY;
          window.scrollTo(0, scrollY);
          setIntroDoneLogo(true);
        },
      });

      // ---- Initial states
      gsap.set(curtain, { autoAlpha: 1, yPercent: 0 });
      gsap.set(logoWrap, { autoAlpha: 1 });

      // IMPORTANT: evitar flash
      gsap.set([texA, texB, yellow], { opacity: 0 });

      gsap.set(curtain, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      });

      // ---- Band setup (arriba)
      setBand(texA, -10);
      setBand(texB, -14);
      setBand(yellow, 0);

      /* =========================
   CAÍDA HACIA ABAJO (orden)
   1) textura A
   2) textura B
   3) amarillo (último)
   ========================= */

      // 1) Texture A cae
      tl.set(texA, { opacity: 1 });
      tl.to(
        texA,
        {
          y: 480, // ✅ cae y sale por abajo
          x: 18, // drift leve (premium)
          duration: 1.25,
          ease: 'power2.inOut',
        },
        'crossA',
      );

      // 2) Texture B cae (desfasada)
      tl.set(texB, { opacity: 1 }, 'crossA+=0.20');
      tl.to(
        texB,
        {
          y: 400,
          x: -14, // drift contrario
          duration: 1.25,
          ease: 'power2.inOut',
        },
        'crossA+=0.20',
      );

      // 3) Yellow cae al final (última capa)
      tl.set(yellow, { opacity: 1 }, 'crossA+=0.55');
      tl.to(
        yellow,
        {
          y: 420,
          x: 8,
          duration: 1.9,
          ease: 'power1.inOut',
        },
        'crossA+=0.55',
      );
      ////////////////
      // pausa para “leer”
      //aqui se controla si se quiere que la cortina negra se vaya despues
      //de que termine la  animacion del logo
      //CORTINA SE VA ANTES DE QUE EL LOGO DESAPAREZCA
      // Cortina: arranca un poquito después y dura similar
      tl.to(
        curtain,
        { duration: 1.2, yPercent: 100, ease: 'power3.inOut' },
        'crossA+=0.170', // 👈 0.15s después del amarillo
      );

      tl.to(
        curtain,
        {
          duration: 1.2,
          clipPath: 'polygon(0% 45%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'power2.inOut',
        },
        'reveal',
      );
      ////////////////
      // 4) Exit flow: siguen bajando un poco y desaparecen (logo vuelve transparente)
      tl.to(
        [texA, texB, yellow],
        {
          y: '+=70',
          opacity: 0,
          duration: 0.28,
          ease: 'power2.in',
        },
        'exit',
      );

      // 5) Curtain reveal (igual que tú)
      tl.to(logoWrap, { autoAlpha: 0, duration: 0.25 }, 'reveal');

      tl.to(
        curtain,
        { duration: 0.7, yPercent: 105, ease: 'power2.out' },
        'reveal',
      );

      tl.to(
        curtain,
        {
          duration: 1.5,
          clipPath: 'polygon(0% 8%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'power2.inOut',
        },
        'reveal',
      );

      tl.set(curtain, { autoAlpha: 0 });
      tl.set(rootRef.current, { display: 'none' });
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
  }, [setIntroDoneLogo]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-9999 pointer-events-none"
      aria-hidden="true"
    >
      <div data-curtain className="absolute inset-0 bg-black" />

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
                height="800"
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

          {/* Solo se verá lo que pase por encima dentro del mask */}
          <g mask="url(#logoMask)">
            {/* Banda de textura A (más ancha que el logo) */}
            <rect
              data-layer="texA"
              x="-200"
              y="-60"
              width="1400"
              height="320"
              fill="url(#imgPattern)"
              opacity="0"
            />

            {/* Banda de textura B (igual pero desfasada) */}
            <rect
              data-layer="texB"
              x="-200"
              y="-60"
              width="1400"
              height="320"
              fill="url(#imgPattern)"
              opacity="0"
            />

            {/* Banda amarilla (última capa) */}
            <rect
              data-layer="yellow"
              x="-300"
              y="-190"
              width="1400"
              height="520"
              fill={brandYellow}
              opacity="0"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
