import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { ClickOutside } from '.';

describe('<ClickOutside />', () => {
  it('does not call onClickOutside when clicked in the element within', () => {
    const mockedOnClickOutside = jest.fn();

    render(
      <ClickOutside onClickOutside={mockedOnClickOutside}>
        <button>Hoi</button>
      </ClickOutside>
    );

    const button = screen.getByRole('button');

    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockedOnClickOutside).not.toHaveBeenCalled();
  });

  it('calls onClickOutside when clicked outside the children', () => {
    const mockedOnClickOutside = jest.fn();

    render(
      <>
        <ClickOutside onClickOutside={mockedOnClickOutside}>
          <button>Hoi</button>
        </ClickOutside>
        <input type="text" name="foo" data-testid="input" />
      </>
    );

    const input = screen.getByTestId('input');
    const button = screen.getByRole('button');

    fireEvent.click(input);
    fireEvent.click(button);
    fireEvent.click(input);

    expect(mockedOnClickOutside).toHaveBeenCalledTimes(2);
  });
});
