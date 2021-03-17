import { PostSerieApiData, PostSeriesBlogPost } from '@types-api';
import { sortPostsAscending } from '@utils/posts';

type PostData = {
  id: PostSeriesBlogPost['id'];
  copy: PostSeriesBlogPost['serie_copy'];
  uri: string;
};

export type RelevantPostSerieData = {
  name: PostSerieApiData['name'];
  posts: PostData[];
  amount: number;
};

function getPost(post: PostSeriesBlogPost) {
  return {
    id: post.id,
    copy: post.serie_copy,
    uri: post.slug,
    date: post.date,
  };
}

export function getRelevantPostSerieData(
  postSerie: PostSerieApiData,
): RelevantPostSerieData {
  return {
    name: postSerie.name,
    posts: postSerie.blog_posts.sort(sortPostsAscending).map(getPost),
    amount: postSerie.blog_posts.length,
  };
}
