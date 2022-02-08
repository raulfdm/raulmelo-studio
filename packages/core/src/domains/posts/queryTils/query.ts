import groq from 'groq';

export const tilQuery = groq`
*[_type == "til" && language in $languages && !(_id in path('drafts.**'))] | order(publishedAt desc){
  _id,
  publishedAt,
  title,
  language,
  "slug": slug.current,
  "tags": tags[]->{
    _id,
    name,
    "slug": slug.current
  }
}
`;
