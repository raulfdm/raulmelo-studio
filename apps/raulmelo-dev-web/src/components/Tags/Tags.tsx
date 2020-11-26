import { PostsTagApiData } from '@types-api';
import { getTagUrl } from '@utils/url';
import Link from 'next/link';

export const Tags: React.FC<{ tags: PostsTagApiData }> = ({ tags }) => {
  return (
    <ul className="flex flex-row space-x-2 md:space-x-4 mt-2 md:mt-4">
      {tags.map(({ slug, id, name }) => (
        <li key={id} className="text-sm font-sans text-center hover:font-bold">
          <Link href={getTagUrl(slug)}>
            <a className="underline">#{name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
