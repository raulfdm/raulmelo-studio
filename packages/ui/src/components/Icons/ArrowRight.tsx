import { IconProps } from './types';

export const ArrowRightIcon = ({ width, ...props }: IconProps) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 16h22M18 7l9 9-9 9"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
