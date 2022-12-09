import { fitnessSchemaFields } from '@raulmelo/sanity-fitness';

import { blogTypes } from './blog';
import { customFields } from './customFields';

export const schema = {
  name: `default`,
  types: [...blogTypes, ...fitnessSchemaFields, ...customFields],
};
