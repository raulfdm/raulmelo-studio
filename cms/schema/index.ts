import {blogTypes} from './blog'
import {customFields} from './customFields'
import type {SingleWorkspace} from 'sanity'

export const schema = {
  name: `default`,
  types: [...blogTypes, ...customFields],
} satisfies SingleWorkspace['schema']
