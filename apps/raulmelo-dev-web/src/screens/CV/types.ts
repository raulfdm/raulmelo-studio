import {
  PersonalInformationApiData,
  CvApiData,
  SocialApiData,
  SiteApiData,
} from '@types-api';

export type CvApiDataProps = {
  cv: CvApiData;
  personalInfo: PersonalInformationApiData;
  social: SocialApiData;
  site: SiteApiData;
};
