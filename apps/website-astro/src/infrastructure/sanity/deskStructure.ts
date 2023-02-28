import type { StructureBuilder } from 'sanity/desk';

export function deskStructure(S: StructureBuilder) {
  return S.list()
    .title(`CMS`)
    .items([getBlogMenu(S)]);
}

function getBlogMenu(S: StructureBuilder) {
  const singleTypesIds = [`siteSettings`, `personalInfo`];

  return S.listItem()
    .id(`blog`)
    .title(`Blog`)
    .child(
      S.list()
        .title(`Blog`)
        .items([
          S.listItem()
            .title(`Personal details`)
            .child(
              S.document()
                .schemaType(`personalInfo`)
                .documentId(`personalInfo`),
            ),
          S.listItem()
            .title(`Website settings`)
            .child(
              S.document()
                .schemaType(`siteSettings`)
                .documentId(`siteSettings`),
            ),
          S.listItem()
            .title(`Collections`)
            .child(
              S.list()
                .title(`Collections`)
                .items(
                  S.documentTypeListItems().filter(
                    (listItem) =>
                      !singleTypesIds.includes(listItem.getId() as string),
                  ),
                ),
            ),
        ]),
    );
}
