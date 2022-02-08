import groq from 'groq';

export const defaultSeoQuery = groq`
*[_type == "defaultSeo" && language == $language][0]{
  title,
  language,
  description
}
`;
export const personalInfoQuery = groq`
*[_type == "personalInfo"][0]{
  fullName,
  "profilePic": profilePic.asset->{
    url,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height
  }
}
`;

export const siteSettingsQuery = groq`
*[_type == "siteSettings"][0]{
  url,
  "seoImage": seoImage.asset->{
    url,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height
  } 
}
`;

export const socialsQuery = groq`
*[_type == "social"]{
  name,
  username,
  url
}
`;
