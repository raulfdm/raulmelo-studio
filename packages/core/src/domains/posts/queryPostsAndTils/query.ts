import groq from 'groq';

export const postQuery = groq`
*[_type == "post" && language == $language && !(_id in path('drafts.**'))] |order(publishedAt desc)[$start..$end]{
  _id,
  "slug": slug.current,
  publishedAt,
  title,
  subtitle,
  language,
  description,
  "featuredImage": featuredImage.asset->{
    url,
    "height": metadata.dimensions.height,
    "width": metadata.dimensions.width,
  },
  "tags": tags[]->{
    _id,
    name,
    "slug": slug.current
  }
}
`;

export const tilQuery = groq`
*[_type == "til" && language == $language && !(_id in path('drafts.**'))] |order(publishedAt desc)[$start..$end]{
  _id,
  title,
  publishedAt,
  language,
  "slug": slug.current,
  "tags": tags[]->{
    _id,
    name,
    "slug": slug.current
  }
}
`;
