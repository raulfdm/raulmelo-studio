import '@raulmelo/styles/lib/styles.css?raw';
import '@raulmelo/ui/dist/style.css?raw';

// First, we must import the schema creator
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
import createSchema from 'part:@sanity/base/schema-creator';

// We import object and document schemas
import { blockContentField } from './customFields/blockContent';
import { codePenField } from './customFields/codePenField';
import { dividerField } from './customFields/divider';
import { gifField } from './customFields/gif';
import { imageSliderField } from './customFields/imageSlider';
import { languageField } from './customFields/language';
import { tweetField } from './customFields/tweetField';
import { youtubeVideoField } from './customFields/youtubeVideoField';
import { defaultSeoSchema } from './defaultSeo';
import personalInfo from './personalInfo';
import { postSchema } from './post';
import { postSeries } from './postSeries';
import { rssSchema } from './rss';
import siteSettings from './siteSettings';
import { socialSchema } from './social';
import tag from './tag';
import { til } from './til';
import { usesSchema } from './uses';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    postSchema,
    til,
    tag,
    socialSchema,
    postSeries,
    personalInfo,
    siteSettings,
    rssSchema,
    usesSchema,
    defaultSeoSchema,
    /**
     * Fields
     */
    blockContentField,
    languageField,
    gifField,
    imageSliderField,
    youtubeVideoField,
    tweetField,
    codePenField,
    dividerField,
  ]),
});
