import {defineField} from 'sanity'

import {SpeakerIcon} from 'lucide-react'
import {calloutTypes} from '../../TO_BE_EXTERNAL'

export const calloutField = defineField({
  type: `object`,
  name: `callout`,
  title: `Callout`,
  icon: () => <SpeakerIcon width={20} />,
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
})
