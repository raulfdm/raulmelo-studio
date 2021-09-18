export interface IUsesApiResponse {
  uses: IUsesData;
}

export interface IUsesData {
  locale: string;
  title: string;
  seo: IUsesSEO;
  content: string;
}

interface IUsesSEO {
  title: string;
  description: string;
}
