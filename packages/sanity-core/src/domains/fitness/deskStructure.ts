import type { StructureBuilder } from 'sanity/desk';

import { exerciseSchema } from './schemas/exercise';
import { measurementSchema } from './schemas/measurements';
import { trainingSchema } from './schemas/training';

export function deskStructure(S: StructureBuilder) {
  return S.list()
    .title(`CMS`)
    .items([getTrainingPlannerMenu(S)]);
}

function getTrainingPlannerMenu(S: StructureBuilder) {
  return S.listItem()
    .id(`trainingPlanner`)
    .title(`Training Planner`)
    .child(
      S.list()
        .title(`Training Planner`)
        .items([
          S.listItem()
            .title(`Exercises`)
            .child(S.documentTypeList(exerciseSchema.name)),
          S.listItem()
            .title(`Measurements`)

            .child(
              S.documentTypeList(measurementSchema.name).menuItems([
                S.orderingMenuItem({
                  name: `dateAsc`,
                  title: `Date Ascending`,
                  by: [{ field: `date`, direction: `asc` }],
                }),
                S.orderingMenuItem({
                  name: `dateDesc`,
                  title: `Date Descending`,
                  by: [{ field: `date`, direction: `desc` }],
                }),
              ]),
            ),
          S.listItem()
            .title(`Training Schema`)
            .child(S.documentTypeList(trainingSchema.name)),
        ]),
    );
}

getTrainingPlannerMenu.types = [
  `exercise`,
  `trainingSchema`,
  `trainingRoutine`,
];
