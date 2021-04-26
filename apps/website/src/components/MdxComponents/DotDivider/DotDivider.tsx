import styled from '@emotion/styled';
import classNames from 'classnames';
import React from 'react';

const Dot = styled.div`
  --hr-color: currentColor;
  background-color: var(--hr-color);

  /* IE and Legacy Edge */
  @media screen and (-ms-high-contrast: active) {
    --hr-color: windowText;
  }
  /* Using the new standards for forced colors, currently supported in Chromium Edge */
  @media screen and (forced-colors: active) {
    --hr-color: CanvasText;
  }

  /* For all variants, we need this: */
  & + * {
    margin-top: 0;
  }
`;

/**
 * I'm currently use 3 sizes of tailwind typography:
 * - lg => lower than md:
 * - xl => md:
 * - 2xl => lg:
 *
 * Since I'm fully replacing `hr` element with this custom divider,
 * I have to specify the margins and sizes based on that.
 */

export const DotDivider = () => {
  const dotClasses = classNames([
    /**
     * Arbitrary numbers based on the look and feel
     */
    'w-1.5 h-1.5 lg:w-[0.475rem] lg:h-[0.475rem]',
    'rounded-full',
  ]);

  return (
    <div
      role="separator"
      data-testid="dot-divider"
      className={classNames([
        'flex',
        'justify-center',
        'space-x-3',
        /**
         * - lg: margin top and bottom `em(56px/18px [base font]) => 3.111em`
         * - xl: margin top and bottom `em(56px/20px [base font]) => 2.800em`
         * - 2xl: margin top and bottom `em(72px/24px [base font]) => 3.000em`
         */
        'my-[3.111em] md:my-[2.8em] lg:my-[3em]',
      ])}
    >
      <Dot aria-hidden className={classNames(dotClasses)} />
      <Dot aria-hidden className={classNames(dotClasses)} />
      <Dot aria-hidden className={classNames(dotClasses)} />
    </div>
  );
};
