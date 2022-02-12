import groq from 'groq';

export const getUsesQuery = groq`
*[_type=="uses" && language == $language][0]{
  language,
  title,
  content[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
      ...,
      "itemMeta": @.item -> {
        "slug": slug.current,
        _type
      }
    },
    }
  },
  "seo":{
    "description": seoDescription,
    "title": seoTitle
  }
}
`;
