import React from 'react';
import { render, screen } from '@testing-library/react';

import { BigQuote } from '.';

describe('<BigQuote />', () => {
  it('matches snapshot', () => {
    render(<BigQuote>hey</BigQuote>);

    expect(
      screen.getByRole('blockquote', {
        hidden: true,
      })
    ).toMatchInlineSnapshot(`
      <blockquote
        class="border-none font-title text-3xl lg:text-4xl text-opacity-60 tracking-tight"
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
      }).classList
    ).toContain('my-class');
  });
});
