import * as fs from 'fs';
import { API_URL } from '~config';
import { fetcher } from '~utils';

const query = `
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
        formats
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

interface IConfig {
  outdir: string;
  apiEndpoint?: string;
  fileName?: string;
}

export async function generateSiteData(config: IConfig): Promise<void> {
  const { apiEndpoint = API_URL, outdir, fileName = 'site-data' } = config;

  if (apiEndpoint.includes('localhost')) {
    console.log('Attention: Getting data from Localhost');
  }

  try {
    const { defaultSeoPt, defaultSeoEn, personalInformation, ...rest } =
      await fetcher.graphql<IQueryData>(query);

    const { profile_pic, ...restPersonalInfo } = personalInformation;
    /**
     * Ensure of having both default seo locales
     */
    const finalData = {
      ...rest,
      personalInformation: {
        profile_pic: profile_pic.formats.thumbnail,
        ...restPersonalInfo,
      },
      defaultSeo: {
        pt: defaultSeoPt,
        en: defaultSeoEn,
      },
    };

    const filePath = `${outdir}/${fileName}.json`;

    fs.writeFileSync(filePath, JSON.stringify(finalData, null, 2));

    console.log(`Site data generated at "${filePath}"`);
  } catch (error) {
    console.error('Something went wrong while generating site-data');
    throw error;
  }
}

interface IQueryData {
  defaultSeoPt: DefaultSEO;
  defaultSeoEn: DefaultSEO;
  personalInformation: PersonalInformation;
  site: Site;
  socials: Social[];
}

interface DefaultSEO {
  title: string;
  locale: string;
  description: string;
}

interface PersonalInformation {
  full_name: string;
  profile_pic: ProfilePic;
}

interface ProfilePic {
  formats: Formats;
}

interface Formats {
  thumbnail: Medium;
  medium: Medium;
  small: Medium;
}

interface Medium {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: null;
  url: string;
  provider_metadata: ProviderMetadata;
}

interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

interface Site {
  url: string;
  seo_image: SEOImage;
}

interface SEOImage {
  url: string;
  width: number;
  height: number;
}

interface Social {
  url: string;
  username: string;
  name: string;
}
