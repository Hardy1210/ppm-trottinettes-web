'use client';

import gsap from 'gsap';

import { useId, useLayoutEffect, useRef } from 'react';

type YellowPanelShapeProps = {
  className?: string;
  points?: string;
};

export default function YellowPanelShape({
  className = '',
  points = '0,0 900,0 760,620 0,620',
}: YellowPanelShapeProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const yellowCurtainRef = useRef<SVGRectElement | null>(null);
  const clipId = useId().replace(/:/g, '');

  useLayoutEffect(() => {
    if (!svgRef.current || !yellowCurtainRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(yellowCurtainRef.current, {
        attr: { height: 0 },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 90%',
          once: true,
          // markers: true,
          // si en /lib/utils ya tienes tu config global de ScrollTrigger,
          // reemplaza solo este objeto por tu helper.
        },
      });

      tl.to(yellowCurtainRef.current, {
        attr: { height: 620 },
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.12,
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 900 620"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          <polygon points={points} />
        </clipPath>
      </defs>

      {/* Base blanca */}
      <rect
        x="0"
        y="0"
        width="900"
        height="620"
        fill="#FFFFFF"
        clipPath={`url(#${clipId})`}
      />

      {/* Cortina amarilla */}
      <rect
        ref={yellowCurtainRef}
        x="0"
        y="0"
        width="900"
        height="620"
        fill="#E4E700"
        clipPath={`url(#${clipId})`}
      />
    </svg>
  );
}
