import groq from 'groq';

export const tilQuery = groq`
*[_type=="til" && slug.current == $slug][0]{
  "slug": slug.current,
  language,
  _type
}
`;

export const postQuery = groq`
*[_type=="post" && slug.current == $slug][0]{
  "slug": slug.current,
  language,
  _type
}
`;
