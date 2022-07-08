import { memo } from 'react';
import { FormattedMessage } from 'react-intl';

type HeaderProps = {
  title: string;
  publishedDate: string;
  readingTime?: number;
  subtitle?: string;
};

export const Header = memo(function Header({
  title,
  subtitle,
  readingTime,
  publishedDate,
}: HeaderProps) {
  return (
    <header className="mb-6 border-b">
      <h1 className="text-xl font-black tracking-tight sm:text-2xl lg:text-3xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-lg font-medium tracking-tight sm:text-xl lg:text-2xl opacity-80">
          {subtitle}
        </p>
      )}
      <p className="mt-6 mb-4 text-base text-right lg:text-md">
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
