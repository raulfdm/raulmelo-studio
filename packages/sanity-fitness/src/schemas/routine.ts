import { Rule } from '@sanity/types';

export const TRAINING_ROUTINE_SCHEMA_NAME = 'trainingRoutine';

export const trainingRoutineSchema = {
  name: TRAINING_ROUTINE_SCHEMA_NAME,
  title: 'Training Routine',
  type: 'document',
  fields: [
    {
      type: 'object',
      name: 'routine',
      fields: [
        {
          name: 'name',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'description',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'date',
          type: 'date',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'training',
          title: 'Training',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'training',
              title: 'Training',
              fields: [
                {
                  name: 'exercise',
                  type: 'reference',
                  to: { type: 'exercise' },
                  validation: (Rule: Rule) => Rule.required(),
                },
                {
                  name: 'series',
                  title: 'Series',
                  type: 'number',
                  validation: (Rule: Rule) => Rule.required(),
                },
                {
                  name: 'repetitions',
                  title: 'Repetitions',
                  type: 'string',
                  validation: (Rule: Rule) => Rule.required(),
                },
                {
                  name: 'restTime',
                  title: 'Rest Time',
                  type: 'number',
                  validation: (Rule: Rule) => Rule.required(),
                },
                {
                  title: 'Advanced Technique',
                  name: 'advancedTechnique',
                  type: 'string',
                  options: {
                    list: [
                      { title: `BI-Set`, value: 'bi_set' },
                      { title: `FST-7`, value: 'fst_7' },
                      { title: `GVT`, value: 'gvt' },
                      { title: `Drop Set 3x`, value: 'drop-set' },
                      {
                        title: `Rest 'n' Pause 3x`,
                        value: 'rest_and_pause',
                      },
                      { title: `Warm-Up`, value: 'warm-up' },
                    ],
                  },
                },
              ],
              preview: {
                select: {
                  exercise: 'exercise.name',
                  series: 'series',
                  repetitions: 'repetitions',
                },
                prepare(selection: {
                  exercise: string;
                  series: string;
                  repetitions: string;
                }) {
                  return {
                    title: selection.exercise,
                    subtitle: `${selection.series}x${selection.repetitions}`,
                  };
                },
              },
            },
          ],
        },
        {
          name: 'cardio',
          type: 'object',
          fields: [
            {
              name: 'time',
              title: 'Time',
              description: 'Time in minutes',
              type: 'number',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      routine: 'routine',
    },
    prepare(selection: {
      routine: { name: string; description: string; date: string };
    }) {
      return {
        title: selection.routine.name,
        subtitle: `${selection.routine.description} (${selection.routine.date})`,
      };
    },
  },
};
