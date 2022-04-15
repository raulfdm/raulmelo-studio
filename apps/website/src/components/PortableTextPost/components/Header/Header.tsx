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
  header: tw`mb-6 border-b`,
  title: tw`text-xl font-black tracking-tight sm:text-2xl lg:text-3xl`,
  subtitle: tw`mt-2 text-lg font-medium tracking-tight sm:text-xl lg:text-2xl opacity-80`,
  paragraph: tw`mt-6 mb-4 text-base text-right lg:text-md`,
};

export const Header = React.memo(function Header({
  title,
  subtitle,
  readingTime,
  publishedDate,
}: HeaderProps) {
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
        <FormattedMessage
          id="blogPost.readingTime"
          values={{
            publishedDate,
            readingTime,
          }}
        />
      </p>
    </header>
  );
});
