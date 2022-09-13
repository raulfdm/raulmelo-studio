import { Rule } from '@sanity/types';
export const EXERCISE_SCHEMA_NAME = 'exercise';

export const exerciseSchema = {
  name: EXERCISE_SCHEMA_NAME,
  title: 'Exercise',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Description',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'video',
      title: 'Video',
      type: 'youtubeVideo',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
};
