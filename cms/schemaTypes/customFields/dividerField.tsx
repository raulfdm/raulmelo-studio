import {defineField} from 'sanity'

import {DotSquareIcon} from 'lucide-react'

export const dividerField = defineField({
  name: `divider`,
  type: `object`,
  title: `Section Divider`,
  icon: () => <DotSquareIcon size={20} />,
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
})
