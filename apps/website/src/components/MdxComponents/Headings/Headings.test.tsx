import React from 'react';
import { render } from '@testing-library/react';

import { H1, H2, H3, H4, H5, H6 } from '.';

describe('<Headings />', () => {
  it('has all headings defined ', () => {
    expect(H1).toBeDefined();
    expect(H2).toBeDefined();
    expect(H3).toBeDefined();
    expect(H4).toBeDefined();
    expect(H5).toBeDefined();
    expect(H6).toBeDefined();
  });

  it('matches snapshot', () => {
    const { container } = render(
      <>
        <H1>Some weird Text</H1>
        <H2>Some weird Text</H2>
        <H3>Some weird Text</H3>
        <H4>Some weird Text</H4>
        <H5>Some weird Text</H5>
        <H6>Some weird Text</H6>
      </>,
    );

    expect(container).toMatchInlineSnapshot(`
      .emotion-0.emotion-0 {
        position: relative;
        display: table;
        --icon-visible: hidden;
      }

      .emotion-0.emotion-0:hover {
        --icon-visible: unset;
      }

      <div>
        <h1
          class="emotion-0"
        >
          Some weird Text
        </h1>
        <h2
          class="emotion-0"
        >
          Some weird Text
        </h2>
        <h3
          class="emotion-0"
        >
          Some weird Text
        </h3>
        <h4
          class="emotion-0"
        >
          Some weird Text
        </h4>
        <h5
          class="emotion-0"
        >
          Some weird Text
        </h5>
        <h6
          class="emotion-0"
        >
          Some weird Text
        </h6>
      </div>
    `);
  });
});
