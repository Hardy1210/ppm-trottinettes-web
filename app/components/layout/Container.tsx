import { cn } from '@/app/lib/utils';
import { PropsWithChildren } from 'react';

export function Container(
  props: PropsWithChildren<{
    className?: string;
  }>,
) {
  return (
    <div
      className={cn('mx-auto w-full max-w-7xl px-5 md:px-10', props.className)}
    >
      {props.children}
    </div>
  );
}
