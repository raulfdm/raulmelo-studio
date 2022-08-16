import { TrainingSheetApi } from '$lib/api';

export async function get() {
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
    body: {
      trainingSheet,
      suggestedCurrentIndex,
    },
  };
}
