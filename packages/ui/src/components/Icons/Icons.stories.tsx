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
    <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {modules.map(([name, Icon]) => {
        return (
          <li key={name} className="grid col-auto place-items-center">
            <Icon {...args} />
            <span className="mt-2 text-sm">{`<${name} />`}</span>
          </li>
        );
      })}
    </ul>
  );
};

export const DefaultStory = Template.bind({});
