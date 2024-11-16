import {defineField} from 'sanity'
import {SiYoutube} from '@icons-pack/react-simple-icons'

export const youtubeVideoField = defineField({
  type: 'object',
  name: 'youtubeVideo',
  title: 'Youtube Video',
  icon: () => <SiYoutube width={20} />,
  fields: [
    {
      name: 'videoId',
      type: 'string',
      title: 'The video ID',
      validation: (Rule) => Rule.required(),
      preview: {
        select: {
          videoId: 'videoId',
        },
      },
    },
  ],
})
