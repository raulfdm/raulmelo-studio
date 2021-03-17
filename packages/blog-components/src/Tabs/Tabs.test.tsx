import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Tabs } from './Tabs';
import { Tab } from '../Tab';

describe('<Tabs>', () => {
  it('matches snapshot', () => {
    render(
      <Tabs value="0" onTabChange={jest.fn()}>
        <Tab label="foo" />
      </Tabs>
    );

    const tabs = screen.getByRole('tabpanel');

    expect(tabs).toMatchInlineSnapshot(`
      <ul
        class="flex mb-5 border-b border-gray-400 dark:border-gray-600 border-opacity-20"
        role="tabpanel"
      >
        <li
          class="text-sm cursor-pointer font-sans mr-5"
          data-activetab="true"
          role="tab"
          tabindex="0"
        >
          <span
            class="block text-current pb-2 border-0 transition-all duration-100 ease-linear border-b border-current font-bold"
            data-testid="tab-label"
          >
            foo
          </span>
        </li>
      </ul>
    `);
  });

  it('sends isActive to the active tab', () => {
    render(
      <Tabs value="0" onTabChange={jest.fn()}>
        <Tab label="foo" />
        <Tab label="bar" />
      </Tabs>
    );

    const firstTab = screen.getAllByRole('tab')[0];
    const secondTab = screen.getAllByRole('tab')[1];

    expect(firstTab.dataset.activetab).toBe('true');
    expect(secondTab.dataset.activetab).toBe('false');

    fireEvent.click(secondTab);

    expect(firstTab.dataset.activetab).toBe('false');
    expect(secondTab.dataset.activetab).toBe('true');
  });

  it('calls onTabChange when a tab is clicked', () => {
    const onTabChange = jest.fn();
    render(
      <Tabs value="0" onTabChange={onTabChange}>
        <Tab label="foo" />
      </Tabs>
    );

    const tab = screen.getByRole('tab');

    fireEvent.click(tab);

    expect(onTabChange).toHaveBeenCalledTimes(1);
    expect(onTabChange).toHaveBeenCalledWith(0);
  });

  it('calls onTabChange when a tab is clicked(diff index)', () => {
    const onTabChange = jest.fn();
    const index = 1;
    render(
      <Tabs value="0" onTabChange={onTabChange}>
        <Tab label="foo" />
        <Tab label="bar" />
      </Tabs>
    );

    const tab = screen.getAllByRole('tab')[index];

    fireEvent.click(tab);

    expect(onTabChange).toHaveBeenCalledTimes(1);
    expect(onTabChange).toHaveBeenCalledWith(index);
  });
});
