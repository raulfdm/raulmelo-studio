import React from 'react';
import { render, screen } from '@testing-library/react';

import { ProseContainer } from '.';

describe('<ProseContainer />', () => {
  it('matches snapshot', () => {
    render(<ProseContainer>hey</ProseContainer>);

    expect(screen.getByRole('article')).toMatchInlineSnapshot(`
      <article
        class="prose dark:prose-dark prose-lg lg:prose-xl container mx-auto px-4 md:px-0 max-w-screen-md"
      >
        hey
      </article>
    `);
  });
});
