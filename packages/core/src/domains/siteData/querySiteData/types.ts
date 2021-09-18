import type { SupportedLanguages } from '../../../types';

export interface ISiteDataApiResponse {
  defaultSeoPt: DefaultSEO;
  defaultSeoEn: DefaultSEO;
  personalInformation: PersonalInformation;
  site: Site;
  socials: Social[];
}

export type ISiteData = Pick<
  ISiteDataApiResponse,
  'personalInformation' | 'site' | 'socials'
> & {
  defaultSeo: {
    [keys in SupportedLanguages]: DefaultSEO;
  };
};

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
  width: number;
  height: number;
  url: string;
}

interface Site {
  url: string;
  seo_image: ProfilePic;
}

interface Social {
  url: string;
  username: string;
  name: string;
}
