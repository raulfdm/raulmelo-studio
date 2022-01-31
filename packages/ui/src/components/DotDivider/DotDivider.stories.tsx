import { proseDecorator } from '../../infrastructure/decorators';
import { DotDivider } from './DotDivider';

export default {
  title: 'DotDivider',
  component: DotDivider,
  decorators: [proseDecorator],
};

const Template = () => (
  <>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
      eligendi nesciunt porro inventore expedita eaque error modi, a id magnam
      atque, quasi libero quaerat ipsam minima temporibus quidem delectus
      dolorum?
    </p>
    <DotDivider />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
      assumenda, corrupti minima consequatur at earum corporis saepe tempore
      esse consequuntur provident voluptatibus natus quis distinctio autem
      numquam unde fugit aliquid!
    </p>
  </>
);

export const DefaultStory = Template.bind({});
