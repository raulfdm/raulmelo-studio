import { render, screen } from '@testing-library/react';
import React from 'react';

import { Tags } from './Tags';

describe('<Tags>', () => {
  it('matches snapshot', () => {
    render(
      <Tags>
        <li>hi</li>
      </Tags>,
    );

    const tags = screen.getByRole('list');
    expect(tags).toMatchInlineSnapshot(`
      .emotion-0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        font-size: 1rem;
        line-height: 1.3;
      }

      .emotion-0>* {
        margin-right: 1rem;
      }

      <ul
        class="emotion-0 emotion-1"
      >
        <li>
          hi
        </li>
      </ul>
    `);
  });

  it('renders with passed arguments', () => {
    render(
      <Tags className="my-class">
        <li>foo</li>
        <li>
          <a href="#">bar</a>
        </li>
      </Tags>,
    );

    const tags = screen.getByRole('list');
    const items = screen.getAllByRole('listitem');

    expect(tags.classList).toContain('my-class');
    expect(items).toHaveLength(2);
  });
});
