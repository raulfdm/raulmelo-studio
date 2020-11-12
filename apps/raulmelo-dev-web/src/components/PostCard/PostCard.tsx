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
import { PostModel } from '@models/Post';
import { PostApiData } from 'src/types/api/posts';
import { getTagUrl } from '@utils/url';

type PostCardProps = {
  post: PostModel;
  tags?: PostApiData['post_tags'];
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { featured_image, title, subtitle, date, postUri, post_tags } = post!;

  /**
   * For the tags, every post only has the tags id.
   * Which is not the case for home page where we have an array of tag objects
   * with all tag info.
   */
  const shouldRenderTag =
    isNotNilNorEmpty(post_tags) && typeof post_tags[0] !== 'string';

  const tags = shouldRenderTag ? (
    <Tags>
      {post_tags!.map((tag) => {
        const { id, name, slug } = tag!;
        return <Tag key={id} tag={name!} slug={getTagUrl(slug)} />;
      })}
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
          <Link href={postUri} data-testid="post-card">
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
