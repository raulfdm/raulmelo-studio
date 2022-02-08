import groq from 'groq';

export const postQuery = groq`
*[_type == "post" && language in $languages && !(_id in path('drafts.**'))]{
  _id,
  language,
  "slug": slug.current,
  publishedAt,
  title,
  subtitle,
  description,
  "tags": tags[]->{
    _id,
    name,
    "slug": slug.current
  },
  "featuredImage": featuredImage.asset->{
    url,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height,
  },
  "series": *[_type=='postSeries' && references(^._id)][0]{
    _id,
    name,
    "slug": slug.current
  }
}
`;
