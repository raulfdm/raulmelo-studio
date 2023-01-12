import { defineField, defineType } from 'sanity';
export const EXERCISE_SCHEMA_NAME = 'exercise';

export const exerciseSchema = defineType({
  name: EXERCISE_SCHEMA_NAME,
  title: 'Exercise',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Description',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'youtubeVideo',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
