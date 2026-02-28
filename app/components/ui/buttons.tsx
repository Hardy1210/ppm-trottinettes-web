import clsx from 'clsx';
import Link from 'next/link';

type BaseButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: '_blank' | '_self';
};

export function PrimaryButton({
  href,
  children,
  className,
  target = '_self',
}: BaseButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      className={clsx(
        'inline-flex items-center justify-center gap-2',
        'bg-ppmYellow text-black font-title uppercase tracking-wide',
        'px-5 py-3 rounded-md',
        'hover:opacity-90 transition',
        className,
      )}
    >
      {children}
      <span aria-hidden className="inline-block translate-y-[1px]">
        ↗
      </span>
    </Link>
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
}: BaseButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      className={clsx(
        'inline-flex items-center justify-center',
        'border border-white/20 text-white',
        'px-4 py-2 rounded-full text-sm',
        'hover:bg-white/5 transition',
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
}: BaseButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      className={clsx(
        'inline-flex items-center gap-2',
        'text-white/90 hover:text-white transition',
        'border-b border-white/30 hover:border-white',
        'pb-1',
        className,
      )}
    >
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}
