import React from 'react';
import { render, screen } from '@testing-library/react';

import { ProseContainer } from '.';

describe('<ProseContainer />', () => {
  it('matches snapshot', () => {
    render(<ProseContainer>hey</ProseContainer>);

    expect(screen.getByRole('article')).toMatchInlineSnapshot(`
      <article
        class="prose dark:prose-dark prose-lg md:prose-xl lg:prose-2xl max-w-full"
      >
        hey
      </article>
    `);
  });
});
