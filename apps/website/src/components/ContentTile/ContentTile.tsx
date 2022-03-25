import type { IPostsAndTilsPost } from '@raulmelo/core/dist/types/domains/posts';
import { ArrowRightIcon } from '@raulmelo/ui';
import { m } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import tw, { styled } from 'twin.macro';

import { useLocalization } from '~/hooks/useLocalization';

const Title = styled.h3`
  ${tw`text-lg font-black md:text-xl`};
  ${({ hover }: { hover: boolean }) => hover && tw`text-secondary`}
`;

const Subtitle = styled.h4`
  ${tw`font-medium text-gray-600 dark:text-gray-300 text-md md:text-lg`};
  ${tw`mb-2.5`};
`;

const ReadMore = styled.span`
  ${tw`flex mt-3 font-bold`};
  ${({ hover }: { hover: boolean }) =>
    hover && tw`font-extrabold text-secondary`}
`;

type ContentTileProps = Omit<IPostsAndTilsPost, 'description'> & {
  description?: string;
  urlBuilder: (slug: string) => string;
};

export function ContentTile({
  slug,
  publishedAt,
  title,
  description,
  urlBuilder,
  subtitle,
}: ContentTileProps) {
  const { formatDate, formatMessage } = useLocalization();
  const [isFocused, setIsFocused] = useState(false);

  const formattedPublishedAt = formatDate(new Date(publishedAt), {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  return (
    <m.article
      tw="mb-3"
      onHoverStart={() => setIsFocused(true)}
      onHoverEnd={() => setIsFocused(false)}
    >
      <Link href={urlBuilder(slug)} passHref>
        <a tw="relative inline-block cursor-pointer">
          <Title hover={isFocused}>{title}</Title>
          {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}

          <span tw="block text-md lg:text-base font-sans mb-2.5">
            <time dateTime={publishedAt}>{formattedPublishedAt}</time>
          </span>
          {description && (
            <p tw="text-base md:text-md text-primary dark:text-gray-200 text-opacity-80 dark:text-opacity-100">
              {description}
            </p>
          )}
          <ReadMore hover={isFocused}>
            {formatMessage({ id: 'blog.readMore' })}
            <ArrowRightIcon tw="w-4 ml-2" />
          </ReadMore>
        </a>
      </Link>
    </m.article>
  );
}
