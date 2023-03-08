export function languageGetStaticPaths() {
  return [
    {
      params: {
        lang: `en`,
      },
    },
    {
      params: {
        lang: `pt`,
      },
    },
  ];
}
