import { cn } from '@/app/lib/utils';
import { PropsWithChildren } from 'react';

export function GridSystemLayout(
  props: PropsWithChildren<{
    className?: string;
    gap?: 'sm' | 'md' | 'lg';
  }>,
) {
  const { className, gap = 'md', children } = props;

  const gapClass =
    gap === 'sm'
      ? 'gap-4 md:gap-6'
      : gap === 'lg'
        ? 'gap-8 md:gap-12'
        : 'gap-6 md:gap-8';

  return (
    <div className={cn('grid grid-cols-12', gapClass, className)}>
      {children}
    </div>
  );
}
