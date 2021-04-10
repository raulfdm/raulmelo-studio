import React from 'react';
import { render, screen } from '@testing-library/react';

import { DotDivider } from '.';

describe('<DotDivider />', () => {
  it('matches snapshot', () => {
    render(<DotDivider />);

    expect(screen.getByTestId('dot-divider')).toMatchInlineSnapshot(`
      .emotion-0 {
        --hr-color: currentColor;
        background-color: var(--hr-color);
      }

      @media screen and (-ms-high-contrast: active) {
        .emotion-0 {
          --hr-color: windowText;
        }
      }

      @media screen and (forced-colors: active) {
        .emotion-0 {
          --hr-color: CanvasText;
        }
      }

      .emotion-0+* {
        margin-top: 0;
      }

      <div
        class="flex justify-center space-x-3 my-[3.111em] md:my-[2.8em] lg:my-[3em]"
        data-testid="dot-divider"
        role="separator"
      >
        <div
          aria-hidden="true"
          class="w-1.5 h-1.5 lg:w-[0.475rem] lg:h-[0.475rem] rounded-full emotion-0"
        />
        <div
          aria-hidden="true"
          class="w-1.5 h-1.5 lg:w-[0.475rem] lg:h-[0.475rem] rounded-full emotion-0"
        />
        <div
          aria-hidden="true"
          class="w-1.5 h-1.5 lg:w-[0.475rem] lg:h-[0.475rem] rounded-full emotion-0"
        />
      </div>
    `);
  });
});
