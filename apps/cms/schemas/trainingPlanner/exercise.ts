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
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
  // preview: {
  //   select: {
  //     title: 'title',
  //     language: 'language',
  //   },
  //   prepare(selection: { title: string; language: string }) {
  //     return {
  //       title: `In ${selection.language.toUpperCase()}`,
  //     };
  //   },
  // },
};
