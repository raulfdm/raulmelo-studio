import { getSheet, type Sheet } from '$lib/infrastructure/models/getSheet';

export type PageData = {
	trainingSheet: Sheet;
};

export async function load(): Promise<PageData> {
	const trainingSheet = await getSheet();

	return {
		trainingSheet
	};
}
