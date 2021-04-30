import React from 'react';
import { render, screen } from '@testing-library/react';

import { ProseContainer } from '.';

describe('<ProseContainer />', () => {
  it('renders element', () => {
    render(<ProseContainer>hey</ProseContainer>);

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('article')).toHaveTextContent('hey');
  });
});
