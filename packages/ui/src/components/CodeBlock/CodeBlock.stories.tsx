import { proseDecorator } from '../../infrastructure/decorators';
import { CodeBlock } from './CodeBlock';

export default {
  title: 'CodeBlock',
  component: CodeBlock,
  argTypes: {
    code: {
      control: 'text',
      defaultValue: `console.log('hello')`,
    },
    language: {
      control: {},
      defaultValue: 'javascript',
    },
  },
  decorators: [proseDecorator],
};

const languages = {
  html: `  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <h1>Hi</h1>
    </body>
  </html>`,
};

const Template = (args) => <CodeBlock {...args} />;

export const PassingDirectUrl = Template.bind({});
PassingDirectUrl.args = {
  code: languages.html,
  language: 'html',
  filename: 'index.html',
};
