import { css, cx } from '@emotion/css';

const tagsStyle = css`
  > * {
    margin-right: 1rem;
  }
`;

export function Tags({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'ul'>) {
  return (
    <ul
      {...props}
      className={cx('flex flex-row flex-wrap text-base', tagsStyle, className)}
    />
  );
}

export function Tag({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'li'>) {
  return (
    <li
      {...props}
      className={cx(
        'font-sans text-center list-none cursor-default  hover:font-bold text-secondary',
        className,
      )}
    />
  );
}
