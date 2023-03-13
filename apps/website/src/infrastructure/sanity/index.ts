import { visionTool } from '@sanity/vision';
import { type Config } from 'sanity';
import { deskTool } from 'sanity/desk';
import { media } from 'sanity-plugin-media';

import { config } from './config';
import { deskStructure } from './deskStructure';
import { defaultDocumentNode } from './previewDocumentNode';
import { schema } from './schemas';

export const sanityStudioConfig: Config = {
  projectId: config.projectId,
  dataset: config.dataset,
  basePath: `/admin`,

  plugins: [
    deskTool({
      defaultDocumentNode,
      structure: deskStructure,
    }),
    media(),
    visionTool({
      defaultApiVersion: `v1`,
      defaultDataset: config.dataset,
    }),
  ],
  title: `Raul's CMS`,
  /**
   * TODO: fix fitness types to use `defineField`
   */
  schema: schema as any,
};
