import classNames from 'classnames';

import { PersonalInformationApiData } from '@types-api';
import { siteData } from '@data/siteData';

function normalizePhoneNumber(phone: string): string {
  return phone.replace(/\s/g, '');
}

type InfoProps = Pick<
  PersonalInformationApiData,
  'full_name' | 'phone' | 'city' | 'email' | 'country'
>;

const Link = (props: React.ComponentPropsWithoutRef<'a'>) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    className={classNames([
      'text-base md:text-lg',
      'border-b border-black dark:border-white print:border-none',
    ])}
    {...props}
  />
);

export const Info: React.FC<InfoProps> = ({
  full_name,
  phone,
  city,
  email,
  country,
}) => {
  const cityAndCountry = `${city}, ${country}`;

  return (
    <section className="text-center mb-4 mt-10 md:mt-2">
      <h1 className="text-3xl lg:text-4xl mb-2 font-cv-serif font-bold">
        {full_name}
      </h1>
      <ul
        className={classNames([
          'inline-flex flex-col',
          'space-y-1 print:space-y-0',
        ])}
      >
        <li>
          <Link href={`tel:${normalizePhoneNumber(phone!)}`}>{phone}</Link>
        </li>
        <li>
          <Link href={`https://www.google.com/maps/place/${cityAndCountry}`}>
            {cityAndCountry}
          </Link>
        </li>
        <li>
          <Link href={`mailto:${email}`}>{email}</Link>
        </li>
        <li>
          <Link href={siteData.social.linkedIn.url}>
            {siteData.social.linkedIn.displayName}
          </Link>
        </li>
        <li>
          <Link href={siteData.social.github.url}>
            {siteData.social.github.displayName}
          </Link>
        </li>
      </ul>
    </section>
  );
};
