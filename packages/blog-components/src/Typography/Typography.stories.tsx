import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Typography, TypographyProps } from './Typography';

const meta: Meta = {
  title: 'Components/Typography',
  component: Typography,
  argTypes: {
    variant: {
      defaultValue: 'headline1',
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

export const allHeadings: Story<TypographyProps> = () => (
  <div className="space-y-3">
    <Typography variant="headline1">Headline 1</Typography>
    <Typography variant="headline2">Headline 2</Typography>
    <Typography variant="headline3">Headline 3</Typography>
    <Typography variant="headline4">Headline 4</Typography>
    <Typography variant="headline5">Headline 5</Typography>
    <Typography variant="headline6">Headline 6</Typography>
    <Typography variant="paragraph">
      Paragraph: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum
      consectetur ipsum aliquam. Fuga possimus eaque, harum atque blanditiis eum
      repellat ipsum accusamus voluptatem sit ex id cum exercitationem inventore
      cumque!
    </Typography>
    <Typography variant="link" href="#">
      A link
    </Typography>
  </div>
);
