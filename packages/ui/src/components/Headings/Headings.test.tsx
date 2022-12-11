import { render } from '@testing-library/react';
import React from 'react';

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
      <div>
        <h1
          class="_heading_e7a48a"
        >
          Some weird Text
        </h1>
        <h2
          class="_heading_e7a48a"
        >
          Some weird Text
        </h2>
        <h3
          class="_heading_e7a48a"
        >
          Some weird Text
        </h3>
        <h4
          class="_heading_e7a48a"
        >
          Some weird Text
        </h4>
        <h5
          class="_heading_e7a48a"
        >
          Some weird Text
        </h5>
        <h6
          class="_heading_e7a48a"
        >
          Some weird Text
        </h6>
      </div>
    `);
  });
});
