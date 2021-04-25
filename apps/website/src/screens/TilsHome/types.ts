export interface TilsHomeGraphQLResponse {
  tils: Tils;
}

export type Tils = TilHome[];

export interface TilHome {
  id: string;
  publishedAt: string;
  title: string;
  locale: string;
  slug: string;
  tags: TilHomeTag[];
}

interface TilHomeTag {
  id: string;
  name: string;
  slug: string;
}
