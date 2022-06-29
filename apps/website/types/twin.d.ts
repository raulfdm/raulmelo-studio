/**
 * This file is needed to override the "css" and "style" types from the @types/twin.d.ts.
 * If i don't do that, TS will complain that either some React or
 * framer-motion components does not have the "css" or "style" props.
 *
 * https://github.com/ben-rogerson/twin.examples/blob/master/next-emotion-typescript/types/twin.d.ts
 */

import 'twin.macro';
import { css as cssImport } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';
import styledImport from '@emotion/styled';

declare module 'twin.macro' {
  // The styled and css imports
  const styled: typeof styledImport;
  const css: typeof cssImport;
}

declare module 'react' {
  // The css prop
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSInterpolation;
  }
  // The inline svg css prop
  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    css?: CSSInterpolation;
  }
}

declare module 'framer-motion' {
  /**
   * This is an extension of the HTMLMotionProps interface so that we can add
   * css and styled props (twin macro) to the Motion component.
   */
  interface HTMLMotionProps<T> extends HTMLMotionProps<T> {
    css?: typeof cssImport;
  }
}
