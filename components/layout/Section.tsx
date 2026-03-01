import { cn } from '@/app/lib/utils';

type SectionProps = {
  id?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export function Section({
  id,
  className,
  innerClassName,
  style,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn('relative w-full', className)} style={style}>
      <div
        className={cn(
          'mx-auto w-full max-w-container px-5 xl:px-0',
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

{
  /*import { cn } from '@/app/lib/utils';
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
 */
}
