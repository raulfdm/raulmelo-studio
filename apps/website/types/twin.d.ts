import { TwStyle } from 'twin.macro';
import styledImport from '@emotion/styled';
import { css as cssImport } from '@emotion/react';

declare module 'twin.macro' {
  // The styled and css imports
  const styled: typeof styledImport;
  const css: typeof cssImport;
}

declare module 'framer-motion' {
  /**
   * This is an extension of the HTMLMotionProps interface so that we can add
   * css and styled props (twin macro) to the Motion component.
   */
  interface HTMLMotionProps<T> extends HTMLMotionProps<T> {
    css?: ReturnType<typeof css>;
  }
}

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: ReturnType<typeof css>;
    tw?: TwStyle | string;
  }
  // <style jsx> and <style jsx global> support for styled-jsx
  interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}
