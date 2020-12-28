import React from 'react';
import { render, screen } from '@testing-library/react';

import { Tags } from './Tags';

describe('<Tags>', () => {
  it('matches snapshot', () => {
    render(
      <Tags>
        <li>hi</li>
      </Tags>
    );

    const tags = screen.getByRole('list');
    expect(tags).toMatchInlineSnapshot(`
      <ul
        class="flex flex-row space-x-2 md:space-x-4 mt-2 md:mt-4"
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
      </Tags>
    );

    const tags = screen.getByRole('list');
    const items = screen.getAllByRole('listitem');

    expect(tags.classList).toContain('my-class');
    expect(items).toHaveLength(2);
  });
});
