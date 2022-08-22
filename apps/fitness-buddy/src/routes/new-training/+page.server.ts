import { TrainingSheetApi, type ITrainingSheet } from '$lib/api';

export type PageData = {
  trainingSheet: ITrainingSheet;
  suggestedCurrentIndex: number;
};

export async function load(): Promise<PageData> {
  const trainingSheet = await TrainingSheetApi.getSheet();

  const suggestedCurrentIndex = trainingSheet.schema.findIndex((s) => {
    const schemasFormattedDate = new Intl.DateTimeFormat('pt-BR').format(
      new Date(s.routine.date),
    );

    const todaysFormattedDate = new Intl.DateTimeFormat('pt-BR').format(
      new Date(),
    );

    return schemasFormattedDate === todaysFormattedDate;
  });

  return {
    trainingSheet,
    suggestedCurrentIndex,
  };
}
