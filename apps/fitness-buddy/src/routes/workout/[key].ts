import { TrainingSheetApi } from '$lib/api';
import type { RequestEvent } from '@sveltejs/kit/types/private';

export async function get({ params }: RequestEvent) {
  const { key } = params;

  const trainingRoutine = await TrainingSheetApi.getByKeY(key);

  return {
    body: {
      trainingRoutine,
    },
  };
}
