import * as Icons from './index';

export default {
  title: 'Icons',
  argTypes: {
    width: {
      control: 'number',
      defaultValue: 24,
    },
  },
};

const Template = (args) => {
  const modules = Object.entries(Icons);

  console.log(modules);

  return (
    <ul>
      {modules.map(([name, Icon]) => {
        return (
          <li key={name}>
            <Icon {...args} />
            <span className="text-sm">{name}</span>
          </li>
        );
      })}
    </ul>
  );
};

export const DefaultStory = Template.bind({});
