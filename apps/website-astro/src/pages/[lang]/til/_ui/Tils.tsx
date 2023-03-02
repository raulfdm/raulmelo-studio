import { type SupportedLanguages } from '@raulmelo/core/config';
import { type QueryTilsReturnType } from '@raulmelo/core/domains';
import { domAnimation, LazyMotion } from 'framer-motion';

import { getIntl } from '@/infrastructure/i18n/getServerSideLocales.server';
import { getTilUrl } from '@/infrastructure/utils/url';
import { ContentTile } from '@/ui/ContentTile';

type TilsProps = {
  tils: QueryTilsReturnType;
  lang: SupportedLanguages;
};

export function Tils({ tils, lang }: TilsProps) {
  const intl = getIntl(lang);

  return (
    <ul className="space-y-8">
      {tils.map((til) => (
        <li key={til._id}>
          <LazyMotion features={domAnimation}>
            <ContentTile
              formatDate={(date) =>
                intl.formatDate(date, {
                  month: `long`,
                  day: `numeric`,
                  year: `numeric`,
                })
              }
              readMoreLabel={intl.formatMessage({ id: `tilHome.readMore` })}
              urlBuilder={(slug) => getTilUrl(slug, lang)}
              {...til}
            />
          </LazyMotion>
        </li>
      ))}
    </ul>
  );
}
