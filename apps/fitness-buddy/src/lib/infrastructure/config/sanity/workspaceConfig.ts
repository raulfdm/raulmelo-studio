import type { Config } from 'sanity';
import { deskTool } from 'sanity/desk';
import { media } from 'sanity-plugin-media';
import { visionTool } from '@sanity/vision';

import { deskStructure } from './deskStructure';
import { schema } from './schemas';
import { baseSanityConfig } from './baseConfig';

export const workspaceConfig: Config = {
	projectId: baseSanityConfig.projectId,
	dataset: baseSanityConfig.dataset,
	basePath: `/admin`,

	plugins: [
		deskTool({
			structure: deskStructure
		}),
		media(),
		visionTool({
			defaultApiVersion: `v1`,
			defaultDataset: `production`
		})
	],
	title: `Fitness Buddy`,
	schema: schema as any
};
