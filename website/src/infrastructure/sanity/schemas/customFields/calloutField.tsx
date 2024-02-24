import { defineField } from 'sanity';

import { IconSpeakerphone } from '@/ui/icons-react';
import { calloutTypes } from '@/ui/PortableText/Callout/types';

export const calloutField = defineField({
  type: `object`,
  name: `callout`,
  title: `Callout`,
  icon: () => <IconSpeakerphone width={20} />,
  fields: [
    {
      type: `string`,
      name: `type`,
      initialValue: `info`,
      options: {
        list: calloutTypes.map((type) => ({
          title: type,
          value: type,
        })),
      },
    },
    {
      type: `string`,
      name: `title`,
    },
    {
      type: `blockContent`,
      name: `content`,
      validation: (Rule) => Rule.required(),
    },
  ],
});
