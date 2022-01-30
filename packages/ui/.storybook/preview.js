import '@raulmelo/styles/lib/all.css';
import { ProseContainer } from '../src/components/ProseContainer';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => <ProseContainer>{<Story />}</ProseContainer>,
];
