import groq from 'groq';

export const rssQuery = groq`
*[_type=="rss" && language == $language][0]{
  title,
  description,
  language,
  "siteUrl": *[_type=="siteSettings"][0].url,
  "tils": *[_type=='til' && language == $language && !(_id in path('drafts.**'))] | order(publishedAt desc){
    "slug": slug.current,
    publishedAt,
    title,
    "urlPrefix": "til"
  },
  "posts": *[_type=='post' && language == $language && !(_id in path('drafts.**'))] | order(publishedAt desc){
    "slug": slug.current,
    publishedAt,
    title,
    description,
    "urlPrefix": "blog"
  }
}
`;
