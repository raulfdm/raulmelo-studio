import type { SupportedLanguages } from '@raulmelo/core/config';
import { Hits as HitsComp } from 'react-instantsearch';

import { getIntl } from '@/infrastructure/i18n/getServerSideLocales.server';
import {
  getPostUrl,
  getSnippetUrl,
  getTilUrl,
} from '@/infrastructure/utils/url';
import { ContentTypeTag } from '@/ui/ContentTypeTag';

import type { HitAlgolia } from './types';

type HitsProps = {
  lang: SupportedLanguages;
};

const hrefFuncMap: {
  [key in HitAlgolia['_type']]: (
    slug: string,
    lang: SupportedLanguages,
  ) => string;
} = {
  post: getPostUrl,
  til: getTilUrl,
  codeSnippet: getSnippetUrl,
};
export function Hits({ lang }: HitsProps) {
  return (
    <div className="pb-5 md:pb-10 col-span-full">
      <HitsComp
        hitComponent={({ hit }: { hit: HitAlgolia }) => {
          const getUrl = hrefFuncMap[hit._type];

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
        {_type ? <ContentTypeTag type={_type} /> : null}
      </div>
      {subtitle && (
        <p className="text-lg lg:text-md text-primary dark:text-gray-200 text-opacity-80 dark:text-opacity-100">
          {subtitle}
        </p>
      )}
    </section>
  );
}
