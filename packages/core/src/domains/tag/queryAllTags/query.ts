import groq from 'groq';

export const allTagsQuery = groq`
*[_type == "tag" && !(_id in path('drafts.**'))] | order(slug.current asc){
  "slug": slug.current
}
`;
