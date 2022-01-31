import { proseDecorator } from '../../infrastructure/decorators';
import { Tweet } from './Tweet';

export default {
  title: 'Tweet',
  component: Tweet,
  argTypes: {
    tweetId: {
      control: 'text',
      defaultValue: '1487452256312053763',
    },
  },
  decorators: [proseDecorator],
};

const Template = (args) => <Tweet {...args} />;

export const DefaultStory = Template.bind({});
