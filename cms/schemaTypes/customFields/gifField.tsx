import {defineField} from 'sanity'

import {ImagePlayIcon} from 'lucide-react'

export const gifField = defineField({
  type: `object`,
  name: `gif`,
  title: `GIF`,
  icon: () => <ImagePlayIcon width={20} />,
  fields: [
    {
      name: `src`,
      type: `url`,
    },
    {
      name: `caption`,
      type: `string`,
    },
    {
      name: `width`,
      type: `number`,
    },
    {
      name: `height`,
      type: `number`,
    },
  ],
  components: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    preview: ({src, caption}: any) => {
      return <img src={src} alt={caption} />
    },
  },
  preview: {
    select: {
      src: `src`,
      caption: `caption`,
      width: `width`,
      height: `height`,
    },
  },
})
