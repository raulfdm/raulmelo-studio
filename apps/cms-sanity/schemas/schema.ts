// First, we must import the schema creator
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
import createSchema from 'part:@sanity/base/schema-creator';

// We import object and document schemas
import { blockContentField } from './customFields/blockContent';
import { languageField } from './customFields/language';
import personalInfo from './personalInfo';
import post from './post';
import { postSeries } from './postSeries';
import siteSettings from './siteSettings';
import tag from './tag';
import { til } from './til';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    post,
    tag,
    til,
    personalInfo,
    siteSettings,
    postSeries,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContentField,
    languageField,
  ]),
});
