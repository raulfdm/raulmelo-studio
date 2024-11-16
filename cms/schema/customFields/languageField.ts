import {defineField} from 'sanity'

export const languageField = defineField({
  title: `Language`,
  type: `string`,
  name: `language`,
  initialValue: `en`,
  options: {
    layout: `radio`,
    list: [
      {title: `English`, value: `en`},
      {title: `Português`, value: `pt`},
    ],
  },
})
