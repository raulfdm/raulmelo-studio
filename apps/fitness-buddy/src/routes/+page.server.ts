import { TrainingSheetApi, type ITrainingSheet } from '$lib/api';

export type PageData = {
  trainingSheet: ITrainingSheet;
};

export async function load(): Promise<PageData> {
  const trainingSheet = await TrainingSheetApi.getSheet();

  return {
    trainingSheet,
  };
}
