import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Tab } from './Tab';

describe('<Tab>', () => {
  it('matches snapshot', () => {
    render(<Tab label="Tab" />);

    const tab = screen.getByRole('tab');

    expect(tab).toMatchInlineSnapshot(`
      <li
        class="text-sm cursor-pointer font-sans mr-5"
        role="tab"
      >
        <span
          class="block text-current pb-2 border-0 transition-all duration-100 ease-linear"
          data-testid="tab-label"
        >
          Tab
        </span>
      </li>
    `);
  });

  it('calls onClick prop onClick and onKeyDown', () => {
    const mockOnClick = jest.fn();
    render(<Tab className="my-class" onClick={mockOnClick} label="foo" />);

    const tab = screen.getByRole('tab');

    fireEvent.click(tab);
    fireEvent.keyDown(tab);

    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });

  it('renders label as textContent', () => {
    const mockOnClick = jest.fn();
    render(<Tab className="my-class" onClick={mockOnClick} label="foo" />);

    const tab = screen.getByRole('tab');

    expect(tab.textContent).toBe('foo');
  });

  it('adds active classes when isActive is true', () => {
    render(<Tab className="my-class" label="foo" isActive />);

    const label = screen.getByTestId('tab-label');

    expect(label.classList).toContain('border-b');
    expect(label.classList).toContain('border-current');
    expect(label.classList).toContain('font-bold');
  });
});
