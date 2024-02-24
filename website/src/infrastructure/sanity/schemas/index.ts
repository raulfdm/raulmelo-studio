import { blogTypes } from './blog';
import { customFields } from './customFields';

export const schema = {
  name: `default`,
  types: [...blogTypes, ...customFields],
};
