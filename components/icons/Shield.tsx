import { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'> & {
  size?: number;
};

export const Shield = ({ size = 24, ...props }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 58"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Shield</title>

      <path
        d="M23.2416 1.81682C22.3971 1.39452 21.4029 1.39453 20.5584 1.81682L1.5 11.346V34.092C1.5 40.246 8.76013 47.2477 21.9 55.546C35.0399 47.2477 42.3 41.946 42.3 34.092C42.3 26.238 42.3 11.346 42.3 11.346L23.2416 1.81682Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
};
