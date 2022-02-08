import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'gc3hakk3',
  dataset: 'production',
  apiVersion: 'v1',
  useCdn: true, // `false` if you want to ensure fresh data
});
