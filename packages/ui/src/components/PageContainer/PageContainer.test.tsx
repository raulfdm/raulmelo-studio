import { render, screen } from '@testing-library/react';
import React from 'react';

import { PageContainer } from './index';

describe('<PageContainer />', () => {
  it('renders element', () => {
    render(<PageContainer>hey</PageContainer>);

    expect(screen.getByTestId('page-container')).toBeInTheDocument();
    expect(screen.getByTestId('page-container')).toHaveTextContent('hey');
  });
});
