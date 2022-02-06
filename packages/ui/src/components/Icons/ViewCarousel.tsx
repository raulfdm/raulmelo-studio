import { IconProps } from './types';

export const ViewCarouselIcon = ({ width, ...props }: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      height={width}
      width={width}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="StyledIconBase-ea9ulj-0 bWRyML"
      {...props}
    >
      <title>{'ViewCarousel icon'}</title>
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path d="M2 6h4v11H2zm5 13h10V4H7v15zM9 6h6v11H9V6zm9 0h4v11h-4z" />
    </svg>
  );
};
