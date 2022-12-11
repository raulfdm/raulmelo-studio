import { render, screen } from '@testing-library/react';
import React from 'react';

import { BigQuote } from '.';

describe('<BigQuote />', () => {
  it('matches snapshot', () => {
    render(<BigQuote>hey</BigQuote>);

    expect(
      screen.getByTestId('big-quote', {
        hidden: true,
      }),
    ).toMatchInlineSnapshot(`
      <blockquote
        class="_bigQuote_420836"
        data-testid="big-quote"
      >
        hey
      </blockquote>
    `);
  });

  it('renders passed class', () => {
    render(<BigQuote className="my-class">hey</BigQuote>);

    expect(
      screen.getByTestId('big-quote', {
        hidden: true,
      }).className,
    ).toContain('my-class');
  });
});
