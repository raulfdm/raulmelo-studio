export interface IRSSApiResponse {
  description: string;
  language: string;
  posts: IRSSDataPost[];
  siteUrl: string;
  tils: IRSSDataPost[];
  title: string;
}

export interface IRSSDataPost {
  description?: string;
  publishedAt: Date;
  slug: string;
  title: string;
  urlPrefix: 'blog' | 'til';
}
