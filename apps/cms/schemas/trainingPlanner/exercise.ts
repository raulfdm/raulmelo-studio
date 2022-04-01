export const exerciseSchema = {
  name: 'exercise',
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
