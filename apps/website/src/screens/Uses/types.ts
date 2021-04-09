interface UsesPage {
  language: string;
  content: string;
  title: string;
  seo: { title: string; description: string };
}

export interface UsesPageStaticPropsResponse {
  uses: UsesPage[];
}
