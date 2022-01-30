import { proseDecorator } from '../../infrastructure/decorators';
import { ImageSlider } from './ImageSlider';

export default {
  title: 'ImageSlider',
  component: ImageSlider,
  argTypes: {
    images: {
      control: 'array',
      defaultValue: [
        {
          src: 'https://images.unsplash.com/photo-1640622660914-4b56c79bb492?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          alt: 'Something',
          width: 600,
          height: 300,
        },
        {
          src: 'https://images.unsplash.com/photo-1638913658828-afb88c3d4d11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
          alt: 'Something Else',
          width: 600,
          height: 300,
        },
      ],
    },
  },
  decorators: [proseDecorator],
};

const Template = (args) => <ImageSlider {...args} />;

export const DefaultStory = Template.bind({});
