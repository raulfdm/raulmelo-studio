import { useLocalization } from '@hooks/useLocalization';
import { SupportedLanguages } from '@types-app';
import Link from 'next/link';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  en: {
    id: 'languages.en',
  },
  pt: {
    id: 'languages.pt',
  },
});

export const AvailableTranslations: React.FC<{
  slug: string;
  language: SupportedLanguages;
}> = ({ language, slug }) => {
  const { formatMessage } = useLocalization();

  return (
    <div
      data-testid="blog-available-translations"
      className="my-4 container mx-auto px-4 md:px-0 max-w-screen-md"
    >
      <p className="p-4 bg-yellow-200 bg-opacity-80 rounded-md text-sm">
        <FormattedMessage id="blog.availableTranslations.text" />

        <Link href={slug} locale={language}>
          <a className="ml-1 underline">{formatMessage(messages[language])}</a>
        </Link>
      </p>
    </div>
  );
};
