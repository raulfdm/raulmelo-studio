import { defineField } from 'sanity';

import { CodePenIcon } from './Icons/CodePenIcon';

export const codePenField = defineField({
  type: `object`,
  name: `codePen`,
  title: `CodePen`,
  icon: () => <CodePenIcon width={20} />,
  fields: [
    {
      name: `directUrl`,
      type: `url`,
      title: `CodePen URL`,
      validation: (Rule) => Rule.uri({ scheme: [`https`] }).required(),
      preview: {
        select: {
          directUrl: `directUrl`,
        },
      },
    },
    {
      name: `height`,
      type: `number`,
      title: `Iframe height`,
    },
  ],
});
