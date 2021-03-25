import { Tag, Tags } from '@raulfdm/blog-components';
import { getTagUrl } from '@utils/url';
import Link from 'next/link';

type PostTags = React.FC<{
  tags: { id: string; slug: string; name: string }[];
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
