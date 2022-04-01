export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'string',
    },
    {
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
