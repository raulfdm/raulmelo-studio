import type { SupportedLanguages } from '@raulmelo/core/config';
import { Hits as HitsComp } from 'react-instantsearch-hooks-web';

import { getIntl } from '@/infrastructure/i18n/getServerSideLocales.server';
import { mergeClasses } from '@/infrastructure/utils/misc';
import { getPostUrl, getTilUrl } from '@/infrastructure/utils/url';

import type { HitAlgolia } from './types';

type HitsProps = {
  lang: SupportedLanguages;
};

export function Hits({ lang }: HitsProps) {
  return (
    <div className="pb-5 md:pb-10 col-span-full">
      <HitsComp
        hitComponent={({ hit }: { hit: HitAlgolia }) => {
          const getUrl = hit._type === `post` ? getPostUrl : getTilUrl;

          return (
            <Hit
              {...hit}
              key={hit.objectID}
              href={getUrl(hit.slug, lang)}
              lang={lang}
            />
          );
        }}
      />
    </div>
  );
}

type HitProps = Pick<
  HitAlgolia,
  `_type` | `title` | `publishedAt` | `subtitle`
> & {
  href: string;
  lang: HitsProps[`lang`];
};

function Hit({ _type, href, title, publishedAt, subtitle, lang }: HitProps) {
  const intl = getIntl(lang);

  return (
    <section>
      <a href={href} className="relative inline-block cursor-pointer">
        <h3 className="text-base font-bold lg:text-xl">{title}</h3>
      </a>

      <div className="flex space-x-4 mb-2.5">
        <span className="block font-sans text-md">
          <time dateTime={publishedAt}>
            {intl.formatDate(publishedAt, {
              year: `numeric`,
              month: `short`,
              day: `2-digit`,
            })}
          </time>
        </span>
        {_type ? (
          <span
            className={mergeClasses(
              {
                'bg-indigo-600': _type === `post`,
                'bg-yellow-600': _type === `til`,
              },
              `px-2 rounded-sm min-w-[40px] text-center font-bold text-gray-50 uppercase`,
            )}
          >
            {_type}
          </span>
        ) : null}
      </div>
      {subtitle && (
        <p className="text-lg lg:text-md text-primary dark:text-gray-200 text-opacity-80 dark:text-opacity-100">
          {subtitle}
        </p>
      )}
    </section>
  );
}
