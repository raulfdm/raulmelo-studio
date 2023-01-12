import { getTrainingSheetApi, type ITrainingSheet } from '$lib/api';
import { getProjectIdFromRequestCookie } from '$lib/utils/api';

export type PageData = {
  trainingSheet: ITrainingSheet;
  suggestedCurrentIndex: number;
};

export async function load({ request }): Promise<PageData> {
  const projectId = getProjectIdFromRequestCookie(request);
  const trainingSheet = await getTrainingSheetApi(projectId).getSheet();

  const suggestedCurrentIndex = (trainingSheet.schema || []).findIndex((s) => {
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
