import type { TwFn, css } from 'twin.macro';

export interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  css?: ReturnType<TwFn> | ReturnType<typeof css>;
}
