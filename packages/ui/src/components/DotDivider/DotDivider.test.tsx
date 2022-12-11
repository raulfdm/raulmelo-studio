import { render, screen } from '@testing-library/react';
import React from 'react';

import { DotDivider } from '.';

describe('<DotDivider />', () => {
  it('matches snapshot', () => {
    render(<DotDivider />);

    expect(screen.getByTestId('dot-divider')).toMatchInlineSnapshot(`
      <div
        class="_divider_a2b5bf my-[3.111em] md:my-[2.8em] lg:my-[3em]"
        data-testid="dot-divider"
        role="separator"
      >
        <div
          aria-hidden="true"
          class="_dot_a2b5bf w-1.5 h-1.5 lg:w-2 lg:h-2"
        />
        <div
          aria-hidden="true"
          class="_dot_a2b5bf w-1.5 h-1.5 lg:w-2 lg:h-2"
        />
        <div
          aria-hidden="true"
          class="_dot_a2b5bf w-1.5 h-1.5 lg:w-2 lg:h-2"
        />
      </div>
    `);
  });
});
