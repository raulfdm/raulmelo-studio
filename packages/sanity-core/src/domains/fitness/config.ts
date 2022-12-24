import { visionTool } from '@sanity/vision';
import type { SingleWorkspace } from 'sanity';
import { deskTool } from 'sanity/desk';
import { media } from 'sanity-plugin-media';

import { deskStructure } from './deskStructure';
import { exerciseSchema } from './schemas/exercise';
import { measurementSchema } from './schemas/measurements';
import { trainingRoutineSchema } from './schemas/routine';
import { trainingSchema } from './schemas/training';

type PartialConfig = Pick<SingleWorkspace, 'projectId' | 'dataset'> & {
  apiVersion: string;
};

export function createSanityConfig(config: PartialConfig): SingleWorkspace {
  return {
    ...config,
    basePath: `/admin`,

    plugins: [
      deskTool({
        structure: deskStructure,
      }),
      media(),
      visionTool({
        defaultApiVersion: `v1`,
        defaultDataset: `production`,
      }),
    ],
    title: `Fitness Buddy`,
    schema: [
      exerciseSchema,
      measurementSchema,
      trainingRoutineSchema,
      trainingSchema,
    ],
  } as SingleWorkspace;
}
