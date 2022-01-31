import '@raulmelo/styles/lib/base.css';
import './styles.css';

import { PageContainer } from '../src/components/PageContainer';

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
  (Story) => (
    <main className="grid-container">
      <PageContainer>
        <Story />
      </PageContainer>
    </main>
  ),
];
