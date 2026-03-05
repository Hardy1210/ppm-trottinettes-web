import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  target?: '_blank' | '_self';
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
};

export function PrimaryButton({
  href,
  children,
  className,
  target = '_self',
  ariaLabel,
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseStyles = clsx(
    'inline-flex items-center justify-center',
    'min-h-12 px-10',
    'bg-[var(--ppm-yellow)] text-[var(--ppm-bg)]',
    'font-title tracking-wide',
    'relative',

    // transición
    'transition-all duration-300 ease-out',

    // hover
    'hover:-translate-y-[2px]',
    'hover:shadow-[0_10px_25px_rgba(0,0,0,0.35)]',
    'hover:brightness-110',

    // active
    'active:translate-y-[0px] active:brightness-95',

    // focus accessibility
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ppm-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ppm-bg)]',
    className,
  );

  // Version Link
  if (href) {
    return (
      <Link
        href={href}
        target={target}
        aria-label={ariaLabel}
        className={baseStyles}
        style={{
          clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
        }}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Link>
    );
  }

  // Version button
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={baseStyles}
      style={{
        clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
      }}
    >
      {children}
    </button>
  );
}

/**
 * Botón “tag”/pequeño con look técnico
 */
export function TechButton({
  href,
  children,
  className,
  target = '_self',
  ariaLabel,
}: ButtonProps) {
  return (
    <Link
      href={href || '#'}
      target={target}
      aria-label={ariaLabel}
      className={clsx(
        'inline-flex items-center justify-center',
        'border border-white/20 text-white',
        'px-4 py-2 rounded-full text-sm',
        'transition',
        'hover:bg-white/5',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
        className,
      )}
    >
      {children}
    </Link>
  );
}
/**
 * Botón tipo “underline + flecha” para CTAs secundarios
 */
export function GhostArrowButton({
  href,
  children,
  className,
  target = '_self',
  ariaLabel,
}: ButtonProps) {
  return (
    <Link
      href={href || '#'}
      target={target}
      aria-label={ariaLabel}
      className={clsx(
        'inline-flex items-center gap-2',
        'text-white/80',
        'border-b border-white/30',
        'pb-1',
        'transition',
        'hover:text-white hover:border-white',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
        className,
      )}
    >
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}
