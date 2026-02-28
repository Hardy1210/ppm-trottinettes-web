import { cn } from '@/app/lib/utils';
import { PropsWithChildren } from 'react';

export const Section = (
  props: PropsWithChildren<{
    className?: string;
    style?: React.CSSProperties;
  }>,
) => {
  const { className, style, children } = props;

  return (
    <section className={cn('max-w-7xl mx-auto', className)} style={style}>
      {children}
    </section>
  );
};
