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
    },
    {
      name: 'image',
      title: 'Description',
      type: 'image',
    },
    {
      name: 'video',
      title: 'Video',
      type: 'youtubeVideo',
    },
  ],
};
