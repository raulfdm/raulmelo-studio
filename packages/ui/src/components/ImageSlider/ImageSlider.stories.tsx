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

export const WithRealImages = Template.bind({});
WithRealImages.args = {
  images: [
    {
      src: 'https://res.cloudinary.com/duzei21zt/image/upload/v1598103069/site/desenvolvedor_javascript_brasil_europa_ato_9_parte_2_house_3_7718a8a103.jpg',
      alt: 'Camas',
      width: '4160',
      height: '3120',
    },
    {
      src: 'https://res.cloudinary.com/duzei21zt/image/upload/v1598103074/site/desenvolvedor_javascript_brasil_europa_ato_9_parte_2_house_2_453bceb38e.jpg',
      alt: 'Sala e Entrada',
      width: '4160',
      height: '3120',
    },
    {
      src: 'https://res.cloudinary.com/duzei21zt/image/upload/v1598103067/site/desenvolvedor_javascript_brasil_europa_ato_9_parte_2_house_1_b79e836fca.jpg',
      alt: 'Cozinha',
      width: '4160',
      height: '3120',
    },
  ],
};
