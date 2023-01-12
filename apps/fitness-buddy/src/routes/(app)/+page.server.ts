import { getTrainingSheetApi, type ITrainingSheet } from '$lib/api';
import { getProjectIdFromRequestCookie } from '$lib/utils/api';

export type PageData = {
  trainingSheet: ITrainingSheet;
};

export async function load({ request }): Promise<PageData> {
  const projectId = getProjectIdFromRequestCookie(request);

  const trainingSheet = await getTrainingSheetApi(projectId).getSheet();

  return {
    trainingSheet,
  };
}
