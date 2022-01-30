import { BigQuote } from './BigQuote';

export default {
  title: 'BigQuote',
  component: BigQuote,
  argTypes: {
    children: { control: 'text', defaultValue: 'This is a Big Quote' },
  },
};

const Template = (args) => <BigQuote {...args} />;

export const Primary = Template.bind({});
