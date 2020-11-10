import React from 'react';
import Link from 'next/link';
import { defineMessages, FormattedMessage } from 'react-intl';

import { Phrase, Wrapper } from './styled';
import { RelevantTranslationData } from '@screens/Blog/utils/translations';
import { useLocalization } from '@hooks/useLocalization';

const messages = defineMessages({
  en: {
    id: 'languages.en',
  },
  pt: {
    id: 'languages.pt',
  },
});

export const AvailableTranslations: React.FC<RelevantTranslationData> = ({
  language,
  uri,
}) => {
  const { formatMessage } = useLocalization();

  return (
    <Wrapper data-testid="blog-available-translations" as="div">
      <Phrase>
        <span>
          <FormattedMessage id="blog.availableTranslations.text" />
        </span>
        <Link href={uri} locale={language}>
          <a>{formatMessage(messages[language])}</a>
        </Link>
      </Phrase>
    </Wrapper>
  );
};
