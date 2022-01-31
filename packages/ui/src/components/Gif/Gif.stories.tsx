import { proseDecorator } from '../../infrastructure/decorators';
import { Gif } from './Gif';

export default {
  title: 'Gif',
  component: Gif,
  argTypes: {
    src: {
      control: 'text',
      defaultValue:
        'https://media.giphy.com/media/ulKOLYX8YEFxEopfUr/giphy-downsized-large.gif',
    },
  },
  decorators: [proseDecorator],
};

const Template = (args) => <Gif {...args} />;

export const DefaultStory = Template.bind({});
export const WithCustomWidth = Template.bind({});
WithCustomWidth.args = {
  width: 200,
};

export const WithCaption = Template.bind({});
WithCaption.args = {
  caption: 'A Brodog',
};

export const WithCustomImageComponent = Template.bind({});

WithCustomImageComponent.args = {
  renderImage: ({ src }) => (
    <div className="flex flex-row">
      <img src={src} alt="Foo"></img>
      <img src={src} alt="Bar"></img>
    </div>
  ),
};
