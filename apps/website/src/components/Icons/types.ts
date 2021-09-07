import { css, TwStyle } from 'twin.macro';

export interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  css?: TwStyle | ReturnType<typeof css>;
}
