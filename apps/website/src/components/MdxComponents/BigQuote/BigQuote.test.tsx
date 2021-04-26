import React from 'react';
import { render, screen } from '@testing-library/react';

import { BigQuote } from '.';

describe('<BigQuote />', () => {
  it('matches snapshot', () => {
    render(<BigQuote>hey</BigQuote>);

    expect(
      screen.getByRole('blockquote', {
        hidden: true,
      }),
    ).toMatchInlineSnapshot(`
      <blockquote
        class="border-none text-xl md:text-2xl lg:text-4xl font-black text-opacity-60 tracking-normal"
        role="blockquote"
      >
        hey
      </blockquote>
    `);
  });

  it('renders passed class', () => {
    render(<BigQuote className="my-class">hey</BigQuote>);

    expect(
      screen.getByRole('blockquote', {
        hidden: true,
      }).classList,
    ).toContain('my-class');
  });
});
