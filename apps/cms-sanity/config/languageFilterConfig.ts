// import foo from '@sanity/language-filter/lib/filter-fields';
// console.log(foo);

export default {
  supportedLanguages: [
    { id: 'en', title: 'English' },
    { id: 'pt', title: 'Português' },
  ],
  defaultLanguages: ['en'],
  // Only show language filter for document type `page` (schemaType.name)
  documentTypes: ['post', 'posts', 'default', 'tag'],
  filterField: (enclosingType, field, selectedLanguageIds) => {
    console.log('enclosingType.name', enclosingType.name);
    console.log('selectedLanguageIds', selectedLanguageIds);
    console.log('field.name', field.name);

    return (
      !enclosingType.name.startsWith('language') ||
      selectedLanguageIds.includes(field.name)
    );
  },
};
