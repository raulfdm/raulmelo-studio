import { PersonalInformationApiData } from '@types-api';
import { siteData } from '@data/siteData';
import {
  InformationWrapper,
  Name,
  InfoList,
  InfoItem,
  InfoLink,
} from './styled';

function normalizePhoneNumber(phone: string): string {
  return phone.replace(/\s/g, '');
}

type InfoProps = Pick<
  PersonalInformationApiData,
  'full_name' | 'phone' | 'city' | 'email' | 'country'
>;

export const Info: React.FC<InfoProps> = ({
  full_name,
  phone,
  city,
  email,
  country,
}) => {
  const cityAndCountry = `${city}, ${country}`;

  return (
    <InformationWrapper>
      <Name>{full_name}</Name>
      <InfoList>
        <InfoItem>
          <InfoLink href={`tel:${normalizePhoneNumber(phone!)}`}>
            {phone}
          </InfoLink>
        </InfoItem>
        <InfoItem>
          <InfoLink
            href={`https://www.google.com/maps/place/${cityAndCountry}`}
          >
            {cityAndCountry}
          </InfoLink>
        </InfoItem>
        <InfoItem>
          <InfoLink href={`mailto:${email}`}>{email}</InfoLink>
        </InfoItem>
        <InfoItem>
          <InfoLink href={siteData.social.linkedIn.url}>
            {siteData.social.linkedIn.displayName}
          </InfoLink>
        </InfoItem>
        <InfoItem>
          <InfoLink href={siteData.social.github.url}>
            {siteData.social.github.displayName}
          </InfoLink>
        </InfoItem>
      </InfoList>
    </InformationWrapper>
  );
};
