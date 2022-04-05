import type { RequestEvent } from '@sveltejs/kit/types/private';
import { TrainingSheetApi } from '$lib/api';

export async function get({ params }: RequestEvent) {
  const { id } = params;

  const trainingRoutine = await TrainingSheetApi.getById(id);

  return {
    body: {
      trainingRoutine,
    },
  };
}
