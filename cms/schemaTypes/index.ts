import {blogTypes} from './blog'
import {customFields} from './customFields'

export const schemaTypes = {
  name: `default`,
  types: [...blogTypes, ...customFields],
}
