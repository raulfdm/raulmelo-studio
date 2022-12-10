import { youtubeVideoField } from '@raulmelo/sanity-core';

import { exerciseSchema } from './schemas/exercise';
import { measurementSchema } from './schemas/measurements';
import { trainingRoutineSchema } from './schemas/routine';
import { trainingSchema } from './schemas/training';

/**
 * No idea why but TS is complaining about the type inference on the array
 */
type FitnessSchemaFields = (
  | typeof exerciseSchema
  | typeof trainingRoutineSchema
  | typeof trainingSchema
  | typeof measurementSchema
  | typeof youtubeVideoField
)[];

export const fitnessSchemaFields: FitnessSchemaFields = [
  exerciseSchema,
  trainingRoutineSchema,
  trainingSchema,
  measurementSchema,
  youtubeVideoField,
];

export { EXERCISE_SCHEMA_NAME } from './schemas/exercise';
export { MEASUREMENT_SCHEMA_NAME } from './schemas/measurements';
export { TRAINING_ROUTINE_SCHEMA_NAME } from './schemas/routine';
export { TRAINING_SCHEMA_NAME } from './schemas/training';
