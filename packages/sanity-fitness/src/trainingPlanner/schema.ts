export const TRAINING_SCHEMA_NAME = 'trainingSchema';

export const trainingSchema = {
  name: TRAINING_SCHEMA_NAME,
  title: 'Training Schema',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titulo',
      type: 'string',
    },
    {
      name: 'startDate',
      title: 'Início',
      type: 'date',
    },
    {
      name: 'endDate',
      title: 'Fim',
      type: 'date',
    },
    {
      name: 'schema',
      title: 'Planilha',
      type: 'array',
      of: [
        {
          name: 'routine',
          type: 'reference',
          to: { type: 'trainingRoutine' },
        },
      ],
    },
  ],
};
