import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './Button';

describe('<Button>', () => {
  it('matches snapshot', () => {
    render(<Button>foo</Button>);

    const btn = screen.getByRole('button');
    expect(btn).toMatchInlineSnapshot(`
      <button
        class="bg-purple-600"
      >
        foo
      </button>
    `);
  });
  it('renders with passed arguments', () => {
    const mockOnClick = jest.fn();
    render(
      <Button className="my-class" onClick={mockOnClick}>
        foo
      </Button>
    );

    const btn = screen.getByRole('button');

    expect(btn.textContent).toBe('foo');
    expect(btn.classList).toContain('my-class');

    fireEvent.click(btn);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
