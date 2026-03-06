import { ComponentPropsWithoutRef } from 'react';
export const IconShape2 = (
  props: ComponentPropsWithoutRef<'svg'> & { size?: number },
) => {
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 66 45"
      transform=""
      id="injected-svg"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <title>shape</title>
      <g>
        <path
          d="M49.3604 44.001H0L16.0146 0H65.375L49.3604 44.001Z"
          fill="#E4E700"
          fill-opacity="0.19"
        />
      </g>
    </svg>
  );
};
