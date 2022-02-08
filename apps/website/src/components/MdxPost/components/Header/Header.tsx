import React from 'react';
import { FormattedMessage } from 'react-intl';
import tw from 'twin.macro';

type HeaderProps = {
  title: string;
  publishedDate: string;
  readingTime?: number;
  subtitle?: string;
};

const styles = {
  header: tw`border-b`,
  title: tw`text-xl sm:text-2xl lg:text-3xl font-black tracking-tight`,
  subtitle: tw`tracking-tight text-lg sm:text-xl lg:text-2xl font-medium opacity-80 mt-2`,
  paragraph: tw`text-right text-base lg:text-md mt-6 mb-4`,
};

export const Header: React.FC<HeaderProps> = React.memo(function Header({
  title,
  subtitle,
  readingTime,
  publishedDate,
}) {
  const shouldRenderReadingTime = readingTime && readingTime > 0;

  return (
    <header css={styles.header}>
      <h1 css={styles.title}>{title}</h1>
      {subtitle && <p css={styles.subtitle}>{subtitle}</p>}
      <p css={styles.paragraph}>
        <FormattedMessage
          id="blogPost.publishedAt"
          values={{
            publishedDate,
          }}
        />
        {shouldRenderReadingTime ? (
          <FormattedMessage
            id="blogPost.readingTime"
            values={{
              publishedDate,
              readingTime,
            }}
          />
        ) : null}
      </p>
    </header>
  );
});
