import { documentInternationalization } from '@sanity/document-internationalization';
import { visionTool } from '@sanity/vision';
import type { Config } from 'sanity';
import { structureTool } from 'sanity/structure';
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
    structureTool({
      defaultDocumentNode,
      structure: deskStructure,
    }),
    documentInternationalization({
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'pt', title: 'Portuguese' },
      ],
      schemaTypes: ['post', 'til'],
    }),
    media() as TODO<'No idea why there is a mismatch'>,
    visionTool({
      defaultApiVersion: `v1`,
      defaultDataset: config.dataset,
    }),
  ],
  title: `Raul's CMS`,
  schema: schema,
};
