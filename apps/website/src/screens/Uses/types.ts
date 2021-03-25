interface UsesPage {
  language: string;
  content: string;
  seo: { title: string; description: string };
}

export interface UsesPageStaticPropsResponse {
  uses: UsesPage[];
}
