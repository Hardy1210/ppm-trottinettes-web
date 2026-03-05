'use client';

import gsap from 'gsap';
import { ComponentPropsWithoutRef, useLayoutEffect, useRef } from 'react';

type LogoHeroBgProps = ComponentPropsWithoutRef<'svg'> & {
  size?: number | string;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
  withStroke?: boolean;
  d: string;

  // anim
  animateIn?: boolean;
  delay?: number;
  duration?: number;
  blurFrom?: number; // px
  scaleFrom?: number; // ej 0.96
};

export const LogoHeroBg = ({
  size,
  className,
  color = 'currentColor',
  opacity = 0.09,
  withStroke = false,
  strokeWidth = 16,
  d,
  animateIn = true,
  delay = 0.15,
  duration = 2,
  blurFrom = 20,
  scaleFrom = 0.76,
  ...props
}: LogoHeroBgProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useLayoutEffect(() => {
    if (!animateIn || !svgRef.current) return;

    const el = svgRef.current;

    // estado inicial
    gsap.set(el, {
      opacity: 0,
      scale: scaleFrom,
      transformOrigin: '50% 50%',
      filter: `blur(${blurFrom}px)`,
      willChange: 'transform, opacity, filter',
    });

    const tl = gsap.timeline({ delay });

    tl.to(el, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration,
      ease: 'power3.out',
      clearProps: 'willChange',
    });

    return () => {
      tl.kill();
    };
  }, [animateIn, delay, duration, blurFrom, scaleFrom]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1592 2380"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      {/* Opacidad aplicada UNA sola vez */}
      <g opacity={opacity}>
        {withStroke && (
          <path
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        )}

        <path d={d} fill={color} />
      </g>
    </svg>
  );
};

export default LogoHeroBg;
