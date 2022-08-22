import { TrainingSheetApi } from '$lib/api';

export async function load({ params }) {
  const { id } = params;

  const trainingRoutine = await TrainingSheetApi.getById(id);

  return {
    trainingRoutine,
  };
}
