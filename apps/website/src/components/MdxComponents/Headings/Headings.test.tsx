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

      .emotion-2.emotion-2 {
        position: relative;
        display: table;
        --icon-visible: hidden;
      }

      .emotion-2.emotion-2:hover {
        --icon-visible: unset;
      }

      .emotion-4.emotion-4 {
        position: relative;
        display: table;
        --icon-visible: hidden;
      }

      .emotion-4.emotion-4:hover {
        --icon-visible: unset;
      }

      .emotion-6.emotion-6 {
        position: relative;
        display: table;
        --icon-visible: hidden;
      }

      .emotion-6.emotion-6:hover {
        --icon-visible: unset;
      }

      .emotion-8.emotion-8 {
        position: relative;
        display: table;
        --icon-visible: hidden;
      }

      .emotion-8.emotion-8:hover {
        --icon-visible: unset;
      }

      .emotion-10.emotion-10 {
        position: relative;
        display: table;
        --icon-visible: hidden;
      }

      .emotion-10.emotion-10:hover {
        --icon-visible: unset;
      }

      <div>
        <h1
          class="emotion-0 emotion-1"
        >
          Some weird Text
        </h1>
        <h2
          class="emotion-2 emotion-3"
        >
          Some weird Text
        </h2>
        <h3
          class="emotion-4 emotion-5"
        >
          Some weird Text
        </h3>
        <h4
          class="emotion-6 emotion-7"
        >
          Some weird Text
        </h4>
        <h5
          class="emotion-8 emotion-9"
        >
          Some weird Text
        </h5>
        <h6
          class="emotion-10 emotion-11"
        >
          Some weird Text
        </h6>
      </div>
    `);
  });
});
