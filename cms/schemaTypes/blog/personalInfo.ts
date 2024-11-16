import {defineField, defineType} from 'sanity'

export const personalInfoSchemaType = defineType({
  name: `personalInfo`,
  title: `Personal Information`,
  type: `document`,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  __experimental_actions: [`create`, `update`, /*'delete',*/ `publish`],
  fields: [
    defineField({
      name: `fullName`,
      title: `Full Name`,
      type: `string`,
    }),
    defineField({
      name: `phone`,
      title: `Phone Number`,
      type: `string`,
    }),
    defineField({
      name: `city`,
      title: `City`,
      type: `string`,
    }),
    defineField({
      name: `country`,
      title: `Country`,
      type: `string`,
    }),

    defineField({
      name: `email`,
      title: `Email`,
      type: `string`,
    }),
    defineField({
      name: `profilePic`,
      title: `Profile Picture`,
      type: `image`,
      options: {
        hotspot: true,
      },
    }),
  ],
})
