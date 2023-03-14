import '@raulmelo/styles/lib/styles.css';
import './styles.css';

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
      <Story />
    </main>
  ),
];
