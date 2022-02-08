import groq from 'groq';

export const getUsesQuery = groq`
*[_type=="uses" && language == $language][0]{
  language,
  title,
  content,
  "seo":{
    "description": seoDescription,
    "title": seoTitle
  }
}
`;
