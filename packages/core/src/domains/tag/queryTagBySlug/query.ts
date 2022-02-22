import groq from 'groq';

export const tagsBySlugQuery = groq`
*[_type == "tag" && slug.current == $slug && !(_id in path('drafts.**'))][0]{
  _id,
  name,
  "slug": slug.current,
  "posts": *[_type=='post' && references(^._id) && language == $language && !(_id in path('drafts.**'))] | order(publishedAt desc){
    _id,
    _type,
    publishedAt,
    "slug": slug.current,
    title,
    subtitle,
    description,
    language,
    "tags": tags[]->{
      _id,
      "slug": slug.current,
      name
    },
    "featuredImage": featuredImage.asset->{
      url,
      "width": metadata.dimensions.width,
      "height": metadata.dimensions.height,
    }
  },
  "tils": *[_type=='til' && references(^._id) && language == $language && !(_id in path('drafts.**'))] | order(publishedAt desc){
    _id,
    _type,
    publishedAt,
    "slug": slug.current,
    title,
    language,
    "tags": tags[]->{
      _id,
      "slug": slug.current,
      name
    }
  },
}
`;
