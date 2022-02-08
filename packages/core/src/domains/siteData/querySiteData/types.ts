import type { SupportedLanguages } from '../../../types';

export interface ISiteData {
  personalInformation: PersonalInformation;
  site: Site;
  socials: Social[];
  defaultSeo: {
    [keys in SupportedLanguages]: DefaultSEO;
  };
}

interface DefaultSEO {
  title: string;
  locale: string;
  description: string;
}

interface PersonalInformation {
  fullName: string;
  profilePic: ProfilePic;
}

interface ProfilePic {
  width: number;
  height: number;
  url: string;
}

interface Site {
  url: string;
  seoImage: ProfilePic;
}

interface Social {
  url: string;
  username: string;
  name: string;
}
