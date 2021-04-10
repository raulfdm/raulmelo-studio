import { Meta } from '@storybook/react';
import React from 'react';

import { IconProps } from './types';

const Icons: {
  [iconName: string]: React.ElementType<IconProps>;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('./index');

const meta: Meta = {
  title: 'Components/Icons',
  decorators: [
    (storyFn: () => React.ReactNode) => {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {storyFn()}
        </div>
      );
    },
  ],
  argTypes: {
    width: {
      defaultValue: 24,
      control: {
        type: 'number',
      },
    },
  },
};

export default meta;

export const allIcons = (args: IconProps) => {
  const iconsEntries = Object.entries(Icons);

  return iconsEntries.map(([iconName, Icon]) => (
    <div className="grid place-items-center" key={iconName}>
      <p>{`<${iconName} />`}</p>
      <Icon {...args} />
    </div>
  ));
};
