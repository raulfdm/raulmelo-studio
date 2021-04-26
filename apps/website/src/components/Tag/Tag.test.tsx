import React from 'react';
import { render, screen } from '@testing-library/react';

import { Tag } from './Tag';

describe('<Tag>', () => {
  it('matches snapshot', () => {
    render(<Tag>#foo</Tag>);

    const tags = screen.getByRole('listitem');
    expect(tags).toMatchInlineSnapshot(`
      <li
        class="font-sans text-center hover:font-bold cursor-default list-none"
      >
        #foo
      </li>
    `);
  });

  it('renders with passed arguments', () => {
    render(
      <Tag className="my-class">
        <a href="#">bar</a>
      </Tag>,
    );

    const tag = screen.getByRole('listitem');
    const anchor = screen.getByRole('link');

    expect(tag.classList).toContain('my-class');
    expect(anchor).toBeDefined();
  });
});
