import React from 'react';

/**
 * Whenever we define a `preview.component`, sanity does not spread the values
 * from the field, instead, it adds a type called "value" that contains whatever
 * we defined in the `preview.select` object.
 *
 * Since there's an API mismatch between Sanity and my own components, this utility
 * help us to forward the value prop to the component.
 */
export function sanityToUiAdapter(
  Component: (props: any) => JSX.Element | null,
) {
  return function Comp({ value }: any) {
    const { _type, ...props } = value;
    return <Component {...props} />;
  };
}

export function memoizeAndRemoveStyle(
  Component: (props: any) => JSX.Element | null,
) {
  return React.memo(function Comp({ style, ...props }: any) {
    return <Component {...props} sanityStyle={style} />;
  });
}
