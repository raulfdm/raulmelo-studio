import createSchema from 'part:@sanity/base/schema-creator';
import { fitnessSchemaFields } from '@raulmelo/sanity-fitness';

import schemaTypes from 'all:part:@sanity/base/schema-type';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([...fitnessSchemaFields]),
});
