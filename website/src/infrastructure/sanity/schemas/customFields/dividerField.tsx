import { defineField } from 'sanity';

import { IconDots } from '@/ui/icons-react';

export const dividerField = defineField({
  name: `divider`,
  type: `object`,
  title: `Section Divider`,
  icon: () => <IconDots size={20} />,
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
