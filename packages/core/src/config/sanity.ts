import sanityClient from '@sanity/client';

export const sanityConfig = {
  projectId: 'gc3hakk3',
  dataset: 'production',
  apiVersion: 'v1',
  useCdn: false, // `false` if you want to ensure fresh data
};

export const client = sanityClient(sanityConfig);
