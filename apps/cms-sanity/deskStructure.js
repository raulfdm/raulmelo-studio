import S from '@sanity/desk-tool/structure-builder';

const singleTypesIds = ['siteSettings'];

export default () =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Settings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !singleTypesIds.includes(listItem.getId()),
      ),
    ]);
