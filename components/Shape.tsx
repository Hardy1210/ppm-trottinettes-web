import React from 'react';

type ShapeProps = {
  className?: string;
  opacity?: number;
  color?: string;
  style?: React.CSSProperties;
  pathProps?: React.SVGProps<SVGPathElement>;
  svgProps?: React.SVGProps<SVGSVGElement>;
};

/**
 * SVG shape, reutilizable para decorativos de fondo.
 *
 * @param {string} [className] - Extra Tailwind (u otras) clases.
 * @param {number} [opacity=0.04] - Opacidad del relleno (0.0-1.0).
 * @param {string} [color='black'] - Color base del shape.
 * @param {object} [style] - CSS styles para SVG.
 * @param {object} [pathProps] - Extra props para el <path/>.
 * @param {object} [svgProps] - Extra props para el <svg/>.
 */
export function Shape({
  className = '',
  opacity = 0.04,
  color = 'black',
  style,
  pathProps,
  svgProps,
}: ShapeProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 66 44"
      preserveAspectRatio="none"
      style={style}
      {...svgProps}
    >
      <path
        d="M49.3604 44.001H0L16.0146 0H65.375L49.3604 44.001Z"
        fill={`rgba(${
          color === 'black'
            ? '0,0,0'
            : color === 'white'
              ? '255,255,255'
              : color.startsWith('#')
                ? hexToRgb(color)
                : color
        },${opacity})`}
        {...pathProps}
      />
    </svg>
  );
}

// Utilidad para convertir color HEX a rgb
function hexToRgb(hex: string): string {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  // Expand shorthand hex (#abc)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((x) => x + x)
      .join('');
  }
  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `${r},${g},${b}`;
}
