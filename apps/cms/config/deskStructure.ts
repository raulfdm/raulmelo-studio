import S from '@sanity/desk-tool/structure-builder';

export default () => S.list().title('Base').items([getBlogMenu()]);

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
                  S.documentTypeListItems().filter(
                    (listItem) => !singleTypesIds.includes(listItem.getId()),
                  ),
                ),
            ),
        ]),
    );
}
