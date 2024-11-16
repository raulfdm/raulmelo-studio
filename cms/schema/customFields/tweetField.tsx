import {defineField} from 'sanity'

import {SiX} from '@icons-pack/react-simple-icons'

export const tweetField = defineField({
  type: `object`,
  name: `tweet`,
  title: `Tweet`,
  icon: () => <SiX size={20} />,
  fields: [
    {
      name: `tweetId`,
      type: `string`,
      title: `The tweet ID`,
      preview: {
        select: {
          tweetId: `tweetId`,
        },
        prepare({tweetId}) {
          return {
            title: `Tweet ID: ${tweetId}`,
          }
        },
      },
    },
  ],
})
