import groq from 'groq';

export function getTrainingSheetApi() {
	const TrainingSheetApi = {
		async getById(
			key: string
		): Promise<({ _id: ITrainingSchema['_id'] } & ITrainingSchema['routine']) | undefined> {
			// const query = groq`
			// `;
			// const result = await client.fetch<ITrainingSchema>(query, { id: key });
			// return {
			// 	_id: result._id,
			// 	...result.routine
			// };
		}
	};

	return TrainingSheetApi;
}
