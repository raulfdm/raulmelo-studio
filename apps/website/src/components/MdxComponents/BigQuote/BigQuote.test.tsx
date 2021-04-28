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
      .emotion-0 {
        border-style: none;
        font-size: 1.777rem;
        line-height: 1.3;
        font-weight: 900;
        letter-spacing: 0em;
      }

      @media (min-width: 768px) {
        .emotion-0 {
          font-size: 2.369rem;
          line-height: 1.3;
        }
      }

      @media (min-width: 1024px) {
        .emotion-0 {
          font-size: 4.209rem;
          line-height: 1.3;
        }
      }

      <blockquote
        class="emotion-0"
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
