/**
 * This file is needed to override the "css" and "style" types from the @types/twin.d.ts.
 * If i don't do that, TS will complain that either some React or
 * framer-motion components does not have the "css" or "style" props.
 */
import type { TwStyle } from 'twin.macro';
import type styledImport from '@emotion/styled';
import type { css as cssImport } from '@emotion/react';

declare module 'twin.macro' {
  // The styled and css imports
  const styled: typeof styledImport;
  const css: typeof cssImport;
}

type CssTw = ReturnType<typeof css> | TwStyle;

declare module 'framer-motion' {
  /**
   * This is an extension of the HTMLMotionProps interface so that we can add
   * css and styled props (twin macro) to the Motion component.
   */
  interface HTMLMotionProps<T> extends HTMLMotionProps<T> {
    css?: CssTw;
  }
}

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CssTw;
    tw?: TwStyle | string;
  }
  // <style jsx> and <style jsx global> support for styled-jsx
  interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}
