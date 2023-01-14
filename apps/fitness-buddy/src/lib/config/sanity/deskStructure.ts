import type { StructureBuilder } from 'sanity/desk';
import { exerciseSchema } from './schemas/exercise';
import { measurementSchema } from './schemas/measurements';
import { trainingSchema } from './schemas/training';

export function deskStructure(S: StructureBuilder) {
	return S.list()
		.title(`Training Planner`)
		.id(`trainingPlanner`)
		.items([
			S.listItem().title(`Exercises`).child(S.documentTypeList(exerciseSchema.name)),
			S.listItem()
				.title(`Measurements`)
				.child(
					S.documentTypeList(measurementSchema.name).menuItems([
						S.orderingMenuItem({
							name: `dateAsc`,
							title: `Date Ascending`,
							by: [{ field: `date`, direction: `asc` }]
						}),
						S.orderingMenuItem({
							name: `dateDesc`,
							title: `Date Descending`,
							by: [{ field: `date`, direction: `desc` }]
						})
					])
				),
			S.listItem().title(`Training Schema`).child(S.documentTypeList(trainingSchema.name))
		]);
}
