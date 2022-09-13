import {
  EXERCISE_SCHEMA_NAME,
  TRAINING_ROUTINE_SCHEMA_NAME,
  TRAINING_SCHEMA_NAME,
} from '@raulmelo/sanity-fitness';
import S from '@sanity/desk-tool/structure-builder';

export default () =>
  S.list().title('CMS').items([getBlogMenu(), getTrainingPlannerMenu()]);

function getBlogMenu() {
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
                      (listItem) => !singleTypesIds.includes(listItem.getId()),
                    )
                    .filter(
                      (listItem) =>
                        !getTrainingPlannerMenu.types.includes(
                          listItem.getId(),
                        ),
                    ),
                ),
            ),
        ]),
    );
}

function getTrainingPlannerMenu() {
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
            .title('Routine')
            .child(S.documentTypeList(TRAINING_ROUTINE_SCHEMA_NAME)),
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
