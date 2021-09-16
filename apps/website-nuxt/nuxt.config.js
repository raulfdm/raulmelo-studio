export default {
  buildModules: ['@nuxt/typescript-build'],
  build: {
    transpile: ['node-fetch', 'fetch-blob'],
  },
};
