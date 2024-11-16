import {defineField} from 'sanity'

import {SlidersHorizontalIcon} from 'lucide-react'

export const imageSliderField = defineField({
  type: `object`,
  name: `imageSlider`,
  title: `Image Slider`,
  icon: () => <SlidersHorizontalIcon size={20} />,
  preview: {
    select: {
      images: `images`,
      id: `id`,
    },
    prepare(value) {
      let title = `Image Slider`
      let imagesQty = 0

      if (value.id) {
        title += `: ${value.id.current}`
      }

      if (value.images) {
        imagesQty = value.images.length
      }

      const subtitle = `${imagesQty} images`

      return {
        title,
        subtitle,
      }
    },
  },
  fields: [
    {
      type: `slug`,
      name: `id`,
      title: `ID`,
      validation: (Rule) => Rule.required(),
    },
    {
      name: `images`,
      type: `array`,
      of: [
        {
          type: `object`,
          name: `images`,
          fields: [
            {
              type: `image`,
              name: `image`,
              title: `Image`,
              validation: (Rule) => Rule.required(),
            },
            {type: `string`, name: `alt`, title: `Alternative Text`},
            {type: `string`, name: `caption`, title: `Image caption`},
            {
              type: `number`,
              name: `width`,
            },
            {
              type: `number`,
              name: `height`,
            },
          ],
        },
      ],
    },
  ],
})
