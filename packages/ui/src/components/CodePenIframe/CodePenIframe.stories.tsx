import { proseDecorator } from '../../infrastructure/decorators';
import { CodePenIframe } from './CodePenIframe';

export default {
  title: 'CodePenIframe',
  component: CodePenIframe,
  argTypes: {
    directUrl: {
      control: 'text',
      defaultValue: 'https://codepen.io/P1N2O/pen/pyBNzX',
    },
  },
  decorators: [proseDecorator],
};

const Template = (args) => <CodePenIframe {...args} />;

export const PassingDirectUrl = Template.bind({});

export const PassingSrc = Template.bind({});
PassingSrc.args = {
  src: 'https://codepen.io/P1N2O/embed/pyBNzX?default-tab=html%2Cresult',
  directUrl: '',
};

export const WithCustomHeight = Template.bind({});
WithCustomHeight.args = {
  height: '600',
};

/* <iframe
  height="300"
  style="width: 100%;"
  scrolling="no"
  title="Pure CSS Gradient Background Animation"
  src="https://codepen.io/P1N2O/embed/pyBNzX?default-tab=html%2Cresult"
  frameborder="no"
  loading="lazy"
  allowtransparency="true"
  allowfullscreen="true"
>
  See the Pen{' '}
  <a href="https://codepen.io/P1N2O/pen/pyBNzX">
    Pure CSS Gradient Background Animation
  </a>{' '}
  by Manuel Pinto (<a href="https://codepen.io/P1N2O">@P1N2O</a>) on{' '}
  <a href="https://codepen.io">CodePen</a>.
</iframe>; */
