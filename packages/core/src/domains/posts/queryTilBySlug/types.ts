export interface ITilBySlugApiResponse {
  tils: ITilBySlug[];
}

export interface ITilBySlug {
  id: string;
  publishedAt: string;
  title: string;
  locale: string;
  slug: string;
  content: string;
  tags: Tag[];
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}
