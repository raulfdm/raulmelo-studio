import { Tag, Tags } from '@raulfdm/blog-components';
import { PostsTagApiData } from '@types-api';
import { getTagUrl } from '@utils/url';
import Link from 'next/link';

type PostTags = React.FC<{
  tags: PostsTagApiData;
  tagClassName?: string;
}>;

export const PostTags: PostTags = ({ tags, tagClassName }) => {
  return (
    <Tags>
      {tags.map(({ slug, id, name }) => (
        <Tag key={id} className={tagClassName}>
          <Link href={getTagUrl(slug)}>
            <a className="underline">#{name}</a>
          </Link>
        </Tag>
      ))}
    </Tags>
  );
};
