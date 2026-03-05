'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import React, { useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type WindowConfig = {
  positionClassName: string;
  widthClassName: string;
  src: string;
  alt: string;
  curtainColor: string;
  delay: number;
  priority?: boolean;
};

type HeroWindowsStackProps = {
  topSrc: string;
  bottomSrc: string;
  maskUrl?: string;
  className?: string;
  logo: React.ReactNode;
  topWidthClassName?: string;
  bottomWidthClassName?: string;
  /** Color de la cortina superior   @default '#e5e0d8' */
  topCurtainColor?: string;
  /** Color de la cortina inferior   @default '#e4e700' */
  bottomCurtainColor?: string;
  /** Delay antes de arrancar         @default 0.3 */
  startDelay?: number;
};

// ─── Easing compartido ────────────────────────────────────────────────────────
const EASE = 'power3.inOut';
const SWIPE_DURATION = 0.75;

// ─── Subcomponente: una ventana animada ──────────────────────────────────────
function AnimatedWindow({
  config,
  tl,
}: {
  config: WindowConfig;
  tl: gsap.core.Timeline | null;
}) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const registered = useRef(false);

  React.useEffect(() => {
    if (!tl || !curtainRef.current || !imageRef.current || registered.current)
      return;
    registered.current = true;

    const curtain = curtainRef.current;
    const image = imageRef.current;

    gsap.set([curtain, image], { clipPath: 'inset(100% 0% 0% 0%)' });

    tl
      // 1. Cortina entra ↑
      .to(
        curtain,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: SWIPE_DURATION,
          ease: EASE,
        },
        config.delay,
      )
      // 2. Imagen entra ↑  +  cortina sale ↑  (simultáneos)
      .to(
        image,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: SWIPE_DURATION,
          ease: EASE,
        },
        `>-0.1`,
      )
      .to(
        curtain,
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: SWIPE_DURATION * 0.8,
          ease: EASE,
        },
        '<+0.1',
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tl]);

  return (
    <div
      className={`absolute ${config.positionClassName} ${config.widthClassName}`}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {/* Cortina de color */}
        <div
          ref={curtainRef}
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ backgroundColor: config.curtainColor }}
        />
        {/* Imagen */}
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src={config.src}
            alt={config.alt}
            fill
            className="object-cover"
            priority={config.priority}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export function HeroWindowsStack({
  topSrc,
  bottomSrc,
  maskUrl = '/svg-mask/mask-hero.svg',
  className,
  logo,
  topWidthClassName = 'w-[85%]',
  bottomWidthClassName = 'w-[85%]',
  topCurtainColor = '#e5e0d8',
  bottomCurtainColor = '#e4e700',
  startDelay = 0.3,
}: HeroWindowsStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tl, setTl] = React.useState<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline({ delay: startDelay });
      setTl(timeline);
    },
    { scope: containerRef },
  );

  const windows: WindowConfig[] = [
    {
      positionClassName: 'top-0 left-0',
      widthClassName: topWidthClassName,
      src: topSrc,
      alt: 'Trottinette électrique en atelier',
      curtainColor: topCurtainColor,
      delay: 0,
      priority: true,
    },
    {
      positionClassName: 'bottom-0 right-0',
      widthClassName: bottomWidthClassName,
      src: bottomSrc,
      alt: 'Réparation et maintenance de trottinette',
      curtainColor: bottomCurtainColor,
      delay: 0,
    },
  ];

  return (
    <div
      ref={containerRef}
      className={`relative aspect-square w-full isolate ${className ?? ''}`}
    >
      {/* LOGO fondo */}
      <div
        className="absolute left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-right-[41%] top-1/2 -z-10 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      >
        {logo}
      </div>

      {/* Contenedor con máscara SVG */}
      <div
        className="absolute inset-0 z-20"
        style={{
          WebkitMaskImage: `url('${maskUrl}')`,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskSize: '100% 100%',
          WebkitMaskPosition: 'center',
          maskImage: `url('${maskUrl}')`,
          maskRepeat: 'no-repeat',
          maskSize: '100% 100%',
          maskPosition: 'center',
        }}
      >
        {windows.map((win) => (
          <AnimatedWindow key={win.positionClassName} config={win} tl={tl} />
        ))}
      </div>
    </div>
  );
}
