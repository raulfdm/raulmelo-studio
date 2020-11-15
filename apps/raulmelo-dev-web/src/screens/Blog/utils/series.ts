import { PostSerieApiData } from '@types-api';

type Post = PostSerieApiData['blog_posts'][0];

type PostData = {
  id: Post['id'];
  copy: Post['serie_copy'];
  uri: string;
};

export type RelevantPostSerieData = {
  name: PostSerieApiData['name'];
  posts: PostData[];
  amount: number;
};

function getPost(post: Post) {
  return {
    id: post.id,
    copy: post.serie_copy,
    uri: post.slug,
  };
}

export function getRelevantPostSerieData(
  postSerie: PostSerieApiData,
): RelevantPostSerieData {
  return {
    name: postSerie.name,
    posts: postSerie.blog_posts.map(getPost),
    amount: postSerie.blog_posts.length,
  };
}
