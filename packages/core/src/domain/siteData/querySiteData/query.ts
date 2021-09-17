export const query = `
  query SiteData {
    defaultSeoPt: defaultSeo(locale: "pt") {
      title
      locale
      description
    }
    defaultSeoEn: defaultSeo(locale: "en") {
      title
      locale
      description
    }
    personalInformation {
      full_name
      profile_pic {
        width
        height
        url
      }
    }
    site {
      url
      seo_image {
        url
        width
        height
      }
    }
    socials {
      url
      username
      name
    }
  }
`;
