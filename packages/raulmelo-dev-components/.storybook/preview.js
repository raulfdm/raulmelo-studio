import React from 'react';
import '../static/css/base.css';

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'lightning',
      items: [
        {
          value: 'light',
          title: 'Light',
          right: '☀️',
        },
        {
          value: 'dark',
          title: 'Dark',
          right: '🌑',
        },
      ],
    },
  },
};

export const decorators = [
  (Story, ctx) => {
    const { theme } = ctx.globals;

    React.useEffect(() => {
      document.querySelector('html').className = theme;
    }, [theme]);

    return <Story></Story>;
  },
];
