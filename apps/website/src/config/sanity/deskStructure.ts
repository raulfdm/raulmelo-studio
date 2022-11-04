import {
  EXERCISE_SCHEMA_NAME,
  MEASUREMENT_SCHEMA_NAME,
  TRAINING_SCHEMA_NAME,
} from '@raulmelo/sanity-fitness';
import type { StructureBuilder } from 'sanity/desk';

export function deskStructure(S: StructureBuilder) {
  return S.list()
    .title('CMS')
    .items([getBlogMenu(S), getTrainingPlannerMenu(S)]);
}

function getBlogMenu(S: StructureBuilder) {
  const singleTypesIds = ['siteSettings', 'personalInfo'];

  return S.listItem()
    .id('blog')
    .title('Blog')
    .child(
      S.list()
        .title('Blog')
        .items([
          S.listItem()
            .title('Personal details')
            .child(
              S.document()
                .schemaType('personalInfo')
                .documentId('personalInfo'),
            ),
          S.listItem()
            .title('Website settings')
            .child(
              S.document()
                .schemaType('siteSettings')
                .documentId('siteSettings'),
            ),
          S.listItem()
            .title('Collections')
            .child(
              S.list()
                .title('Collections')
                .items(
                  S.documentTypeListItems()
                    .filter(
                      (listItem) =>
                        !singleTypesIds.includes(listItem.getId() as string),
                    )
                    .filter((listItem) => {
                      return !getTrainingPlannerMenu.types.includes(
                        listItem.getId() as string,
                      );
                    }),
                ),
            ),
        ]),
    );
}

function getTrainingPlannerMenu(S: StructureBuilder) {
  return S.listItem()
    .id('trainingPlanner')
    .title('Training Planner')
    .child(
      S.list()
        .title('Training Planner')
        .items([
          S.listItem()
            .title('Exercises')
            .child(S.documentTypeList(EXERCISE_SCHEMA_NAME)),
          S.listItem()
            .title('Measurements')

            .child(
              S.documentTypeList(MEASUREMENT_SCHEMA_NAME).menuItems([
                S.orderingMenuItem({
                  name: 'dateAsc',
                  title: 'Date Ascending',
                  by: [{ field: 'date', direction: 'asc' }],
                }),
                S.orderingMenuItem({
                  name: 'dateDesc',
                  title: 'Date Descending',
                  by: [{ field: 'date', direction: 'desc' }],
                }),
              ]),
            ),
          S.listItem()
            .title('Training Schema')
            .child(S.documentTypeList(TRAINING_SCHEMA_NAME)),
        ]),
    );
}

getTrainingPlannerMenu.types = [
  'exercise',
  'trainingSchema',
  'trainingRoutine',
];
