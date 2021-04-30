// import styled from '@emotion/styled';
import tw, { styled, css } from 'twin.macro';
import React from 'react';

const Dot = styled.div(() => [
  tw`w-1.5 h-1.5 lg:width[0.475rem] lg:height[0.475rem]`,
  tw`rounded-full`,
  css`
    --hr-color: var(--secondary);
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
  `,
]);

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
  return (
    <div
      role="separator"
      data-testid="dot-divider"
      css={[
        tw`flex justify-center space-x-3`,
        tw`margin[3.111em 0px] md:margin[2.8em 0px] lg:margin[3em 0px]`,
      ]}
    >
      <Dot aria-hidden />
      <Dot aria-hidden />
      <Dot aria-hidden />
    </div>
  );
};
