import React from 'react';
import { FormattedDate } from 'react-intl';
import Link from 'next/link';
import Image from 'next/image';

import { Tag, Tags } from '@components/Ui';
import { isNotNilNorEmpty } from '@utils/utilities';
import {
  Body,
  DateAndTime,
  ImageContainer,
  Subtitle,
  Title,
  PostCardWrapper,
} from './styled';
import { PostApiData } from 'src/types/api/posts';
import { getPostUrl } from '@utils/url';

type PostCardProps = {
  post: PostApiData;
  tags?: PostApiData['post_tags'];
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    featured_image,
    title,
    subtitle,
    date,
    post_tags,
    slug,
    language,
  } = post!;

  /**
   * For the tags, every post only has the tags id.
   * Which is not the case for home page where we have an array of tag objects
   * with all tag info.
   */
  const shouldRenderTag =
    isNotNilNorEmpty(post_tags) && typeof post_tags[0] !== 'string';

  const tags = shouldRenderTag ? (
    <Tags>
      {post_tags!.map(({ id, name, slug }) => (
        <Tag key={id} tag={name} slug={slug} />
      ))}
    </Tags>
  ) : null;

  return (
    <PostCardWrapper>
      {featured_image && (
        <ImageContainer>
          <Image src={featured_image.url} layout="fill" />
        </ImageContainer>
      )}
      <Body>
        <Title>
          <Link
            href={getPostUrl(slug)}
            data-testid="post-card"
            locale={language}
          >
            <a>{title}</a>
          </Link>
        </Title>

        <DateAndTime>
          <time dateTime={date}>
            <FormattedDate
              value={new Date(date)}
              year="numeric"
              month="short"
              day="2-digit"
            />
          </time>
        </DateAndTime>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        {tags}
      </Body>
    </PostCardWrapper>
  );
};
