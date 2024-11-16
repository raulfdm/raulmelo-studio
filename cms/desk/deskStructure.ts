import type {StructureBuilder} from 'sanity/structure'

export function deskStructure(S: StructureBuilder) {
  const typeIdsToIgnore = [`siteSettings`, `personalInfo`, `media.tag`]

  return S.list()
    .title(`Blog`)
    .items([
      S.listItem()
        .title(`Personal details`)
        .child(S.document().schemaType(`personalInfo`).documentId(`personalInfo`)),
      S.listItem()
        .title(`Website settings`)
        .child(S.document().schemaType(`siteSettings`).documentId(`siteSettings`)),
      S.listItem()
        .title(`Collections`)
        .child(
          S.list()
            .title(`Collections`)
            .items(
              S.documentTypeListItems().filter((listItem) => {
                return !typeIdsToIgnore.includes(listItem.getId() as string)
              }),
            ),
        ),
    ])
}
