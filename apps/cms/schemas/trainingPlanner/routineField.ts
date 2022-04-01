export const trainingRoutineField = {
  name: 'trainingRoutine',
  title: 'Training Routine',
  type: 'object',
  fields: [
    {
      type: 'object',
      name: 'routine',
      fields: [
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'description',
          type: 'string',
        },
        {
          name: 'date',
          type: 'date',
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
                },
                { name: 'series', title: 'Series', type: 'number' },
                {
                  name: 'repetitions',
                  title: 'Repetitions',
                  type: 'string',
                },
                { name: 'restTime', title: 'Rest Time', type: 'number' },
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
                prepare(selection) {
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
    prepare(selection) {
      return {
        title: selection.routine.name,
        subtitle: selection.routine.description,
      };
    },
  },
};
