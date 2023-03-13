import { type SanityDocument } from 'sanity';
import { type DefaultDocumentNodeResolver } from 'sanity/desk';
import Iframe from 'sanity-plugin-iframe-pane';

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) => {
  switch (schemaType) {
    case `post`:
    case `til`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: SanityDocument) => getPreviewUrl(doc),
            reload: {
              button: true,
              revision: 600, // delay (in ms) before the automatic reload on document revision
            },
          })
          .title(`Preview`),
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};

function getPreviewUrl(doc: SanityDocument) {
  let url = window.location.origin;
  const docSlug = doc?.slug as { current?: string };

  if (!docSlug.current) {
    return url;
  }

  const { language, _type } = doc;

  url += `/${language}`;

  if (_type === `post`) {
    url += `/blog`;
  } else if (_type === `til`) {
    url += `/til`;
  }

  return `${url}/${docSlug.current}?preview=true`;
}
