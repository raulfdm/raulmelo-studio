import S from '@sanity/desk-tool/structure-builder';

const singleTypesIds = ['siteSettings', 'personalInfo'];

export default () =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Personal Info')
        .child(
          S.document().schemaType('personalInfo').documentId('personalInfo'),
        ),
      S.listItem()
        .title('Settings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings'),
        ),
      S.divider(),
      S.listItem()
        .title('Collection Types')
        .child(
          S.list()
            .title('Collection Types')
            .items(
              S.documentTypeListItems().filter(
                (listItem) => !singleTypesIds.includes(listItem.getId()),
              ),
            ),
        ),
    ]);
