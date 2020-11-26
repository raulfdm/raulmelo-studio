import classNames from 'classnames';

export const BigQuote = (
  props: React.ComponentPropsWithoutRef<'blockquote'>,
) => (
  <blockquote
    className={classNames([
      'border-none',
      'font-title text-3xl lg:text-4xl',
      'text-opacity-60',
      'tracking-tight',
    ])}
    {...props}
  />
);
