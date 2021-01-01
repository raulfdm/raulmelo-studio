import { Tag, Tags } from '@raulfdm/blog-components';
import { PostsTagApiData } from '@types-api';
import { getTagUrl } from '@utils/url';
import Link from 'next/link';

export const PostTags: React.FC<{ tags: PostsTagApiData }> = ({ tags }) => {
  return (
    <Tags>
      {tags.map(({ slug, id, name }) => (
        <Tag key={id}>
          <Link href={getTagUrl(slug)}>
            <a className="underline">#{name}</a>
          </Link>
        </Tag>
      ))}
    </Tags>
  );
};
