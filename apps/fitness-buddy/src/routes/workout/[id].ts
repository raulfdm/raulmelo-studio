import { TrainingSheetApi } from '$lib/api';

/**
 * @type import('.svelte-kit/types/src/routes/workout/__types/[id].d.ts')
 */
export async function get({ params }) {
  const { id } = params;

  const trainingRoutine = await TrainingSheetApi.getById(id);

  return {
    body: {
      trainingRoutine,
    },
  };
}
