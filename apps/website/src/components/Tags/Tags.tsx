import { css } from '@emotion/css';
import classNames from 'classnames';

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
      className={classNames(
        'flex flex-row flex-wrap text-base',
        tagsStyle,
        className,
      )}
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
      className={classNames(
        'font-sans text-center list-none cursor-default  hover:font-bold text-secondary',
        className,
      )}
    />
  );
}
