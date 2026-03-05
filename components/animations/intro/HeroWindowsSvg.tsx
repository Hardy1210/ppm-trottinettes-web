import React from 'react';

type HeroWindowsSvgProps = React.SVGProps<SVGSVGElement>;

export function HeroWindowsSvg({ className, ...props }: HeroWindowsSvgProps) {
  return (
    <svg
      viewBox="0 0 872 872"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <mask id="ppm-window-mask" maskUnits="userSpaceOnUse">
          {/* Todo oculto por defecto */}
          <rect x="0" y="0" width="872" height="872" fill="black" />

          {/* Frame visible (con huecos gracias a evenodd) */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M870.64 0.5H0.5V870.64H870.64V0.5ZM695.856 1.50016H187.466L2.59672 411.491H510.987L695.856 1.50016ZM868.543 459.649H360.153L175.284 869.64H683.674L868.543 459.649Z"
            fill="white"
          />
        </mask>
      </defs>

      {/* Overlay negro con huecos */}
      <rect
        x="0"
        y="0"
        width="872"
        height="872"
        fill="#1E2126"
        mask="url(#ppm-window-mask)"
      />
    </svg>
  );
}
