import type {SanityDocument} from 'sanity'
import type {DefaultDocumentNodeResolver} from 'sanity/structure'
import {Iframe} from 'sanity-plugin-iframe-pane'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  switch (schemaType) {
    case `post`:
    case `til`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: ExtendedSanityDocument) => getPreviewUrl(doc),
            reload: {
              button: true,
            },
          })
          .title(`Preview`),
      ])
    default:
      return S.document().views([S.view.form()])
  }
}

interface ExtendedSanityDocument extends SanityDocument {
  slug: {current?: string}
  language: string
  _type: string
}

function getPreviewUrl(doc: ExtendedSanityDocument) {
  let url = window.location.origin
  const docSlug = doc?.slug as {current?: string}

  if (!docSlug.current) {
    return url
  }

  const {language, _type} = doc

  url += `/${language}`

  if (_type === `post`) {
    url += `/blog`
  } else if (_type === `til`) {
    url += `/til`
  }

  return `${url}/${docSlug.current}?preview=true`
}
