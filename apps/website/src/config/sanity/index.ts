import type { Config } from 'sanity';
import { deskTool } from 'sanity/desk';
import { media } from 'sanity-plugin-media';

import { deskStructure } from './deskStructure';
import { schema } from './schemas';

export const sanityBaseConfig: Config = {
  projectId: 'gc3hakk3',
  dataset: 'production',
  basePath: '/admin',
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    media(),
  ],
  title: `Raul's CMS`,
  schema,
};
