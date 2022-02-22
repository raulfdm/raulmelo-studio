import groq from 'groq';

export const postQuery = groq`
*[_type=="post" && slug.current == $slug && !(_id in path('drafts.**'))][0]{
  _id,
  content[]{
    ...,
    "image": image.asset ->{
      url,
      "width": metadata.dimensions.width,
      "height": metadata.dimensions.height,
    },
    markDefs[]{
      ...,
      _type == "internalLink" => {
      ...,
      "itemMeta": @.item -> {
        "slug": slug.current,
        _type
      },
    },
    _type == "detailedImage" => {
        ...,
        "image": @.image -> {
          ...
        }
      }
    }
  },
  title,
  subtitle,
  description,
  publishedAt,
  "slug": slug.current,
  language,
  "featuredImage": featuredImage.asset->{
    url,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height,
  },
  "tags": tags[]->{
    _id,
    name,
    "slug": slug.current
  },
  unsplash,
  imageCaption,
  "series": *[_type=='postSeries' && references(^._id)][0]{
    name,
    "posts": posts[]->{
      _id,
      seriesCopy,
      "slug": slug.current,
      publishedAt
    },
  }
}
`;
