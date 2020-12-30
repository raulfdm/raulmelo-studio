import React from 'react';
import { render, screen } from '@testing-library/react';

import { DotDivider } from '.';

describe('<DotDivider />', () => {
  it('matches snapshot', () => {
    render(<DotDivider />);

    expect(screen.getByTestId('dot-divider')).toMatchInlineSnapshot(`
      .emotion-0.emotion-0 {
        border-color: transparent;
        position: relative;
        overflow: visible;
        text-align: center;
      }

      .emotion-0.emotion-0::before {
        content: '...';
        letter-spacing: 0.6em;
        position: relative;
        top: -26px;
      }

      <hr
        class="italic text-2xl my-5 emotion-0"
        data-testid="dot-divider"
      />
    `);
  });
});
