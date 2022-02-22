import groq from 'groq';

export const algoliaPostsQuery = groq`
*[_type== "post" && !(_id in path('drafts.**'))] | order(publishedAt desc){
  _id,
  title,
  subtitle,
  publishedAt,
  language,
  _type,
  "slug": slug.current,
  content,
  "tags": tags[]->{
    _id,
    "slug": slug.current,
    name
  },
  "featuredImage": featuredImage.asset->{
    url,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height
  }
}
`;

export const algoliaTilsQuery = groq`
*[_type== "til" && !(_id in path('drafts.**'))] | order(publishedAt desc){
  _id,
  title,
  publishedAt,
  language,
  _type,
  "slug": slug.current,
  content,
  "tags": tags[]->{
    _id,
    "slug": slug.current,
    name
  }
}
`;
