import { Rule } from '@sanity/types';

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
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'startDate',
      title: 'Início',
      type: 'date',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'endDate',
      title: 'Fim',
      type: 'date',
      validation: (Rule: Rule) => Rule.required(),
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
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },
  ],
};
