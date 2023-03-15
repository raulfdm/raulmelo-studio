type IconProps = React.ComponentPropsWithoutRef<'svg'>;

export function DividerIcon({ width, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      height={width}
      width={width}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="StyledIconBase-ea9ulj-0 bWRyML"
      {...props}
    >
      <title>{`ThreeDots icon`}</title>
      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
    </svg>
  );
}
