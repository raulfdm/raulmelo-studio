import tw, { css } from 'twin.macro';

export interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  css?: ReturnType<typeof tw> | ReturnType<typeof css>;
}
