import { proseDecorator } from '../../infrastructure/decorators';
import { Highlight } from './Highlight';

export default {
  title: 'Highlight',
  component: Highlight,
  argTypes: {
    children: { control: 'text', defaultValue: 'This is a Big Quote' },
  },
  decorators: [proseDecorator],
};

const Template = (args) => {
  return (
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
      placeat, rem, facere deserunt in quia nisi voluptate architecto eligendi,
      inventore <Highlight {...args}></Highlight>. Dolore ullam quis, impedit
      voluptatem consequuntur odio culpa?
    </p>
  );
};

export const Primary = Template.bind({});
