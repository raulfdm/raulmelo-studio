import {defineField} from 'sanity'

import {SiCodepen} from '@icons-pack/react-simple-icons'

export const codePenField = defineField({
  type: `object`,
  name: `codePen`,
  title: `CodePen`,
  icon: () => <SiCodepen size={20} />,
  fields: [
    {
      name: `directUrl`,
      type: `url`,
      title: `CodePen URL`,
      validation: (Rule) => Rule.uri({scheme: [`https`]}).required(),
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
})
