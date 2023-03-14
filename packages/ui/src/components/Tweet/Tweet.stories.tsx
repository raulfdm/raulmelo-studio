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
};

const Template = (args) => <Tweet {...args} />;

export const DefaultStory = Template.bind({});
