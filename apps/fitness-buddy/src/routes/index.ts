import { TrainingSheetApi } from '$lib/api';

export async function get() {
  const trainingSheet = await TrainingSheetApi.getSheet();
  return {
    body: {
      trainingSheet,
    },
  };
}
