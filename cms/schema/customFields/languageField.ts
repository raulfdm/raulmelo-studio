import {SupportedLanguageNames, SupportedLanguagesEnum} from '@raulmelo/core/intl'
import {defineField} from 'sanity'

export const languageField = defineField({
  title: 'Language',
  type: 'string',
  name: 'language',
  initialValue: SupportedLanguagesEnum.ENGLISH,
  options: {
    layout: 'radio',
    list: [
      ...Object.values(SupportedLanguageNames).map((lang) => ({
        title: lang.name,
        value: lang.code,
      })),
    ],
  },
})
