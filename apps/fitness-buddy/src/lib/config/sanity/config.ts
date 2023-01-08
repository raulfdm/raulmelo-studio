import type { Config } from 'sanity';
import * as Desk from 'sanity/desk';
console.log('The DESK is here', Desk);
// import { deskTool } from 'sanity/desk';
// import { media } from 'sanity-plugin-media';
import { visionTool } from '@sanity/vision';

// import { deskStructure } from './deskStructure';
// import { schema } from './schemas';

export const sanityBaseConfig: Config = {
  projectId: `gc3hakk3`,
  dataset: `production`,
  basePath: `/admin`,

  plugins: [
    // deskTool({
    //   // structure: deskStructure,
    // }),
    // media(),
    // visionTool({
    //   defaultApiVersion: `v1`,
    //   defaultDataset: `production`,
    // }),
  ],
  title: `Raul's CMS`,
  /**
   * TODO: fix fitness types to use `defineField`
   */
  // schema: schema as any,
};
