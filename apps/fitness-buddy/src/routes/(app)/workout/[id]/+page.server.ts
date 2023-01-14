import { getTrainingSheetApi } from '$lib/api';
import { getProjectIdFromRequestCookie } from '$lib/utils/api';

export async function load({ params, request }) {
	const projectId = getProjectIdFromRequestCookie(request);
	const { id } = params;

	const trainingRoutine = await getTrainingSheetApi(projectId).getById(id);

	return {
		trainingRoutine
	};
}
