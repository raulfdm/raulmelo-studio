import groq from 'groq';

export const tilBySlugQuery = groq`
*[_type=="til" && slug.current == $slug && !(_id in path('drafts.**'))][0]{
  _id,
  publishedAt,
  title,
  language,
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
  "slug": slug.current,
  "tags": tags[]->{
    _id,
    name,
    "slug": slug.current 
  }
}
`;
