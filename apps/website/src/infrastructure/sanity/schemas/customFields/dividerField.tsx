import { defineField } from 'sanity';

import { DividerIcon } from './Icons/DividerIcon';

export const dividerField = defineField({
  name: `divider`,
  type: `object`,
  title: `Section Divider`,
  icon: () => <DividerIcon width={20} />,
  fields: [
    {
      initialValue: true,
      name: `hr`,
      type: `boolean`,
      readOnly: true,
    },
  ],
  components: {
    preview: () => <hr />,
  },
});
