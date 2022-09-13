import '@raulmelo/styles/lib/styles.css?raw';
import '@raulmelo/ui/dist/style.css?raw';
import '@raulmelo/ui/dist/prism.css?raw';
import '../overrides.css?raw';

import {
  exerciseSchema,
  trainingRoutineSchema,
  trainingSchema,
} from '@raulmelo/sanity-fitness';
// First, we must import the schema creator
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
import createSchema from 'part:@sanity/base/schema-creator';

import { defaultSeoSchema } from './blog/defaultSeo';
import personalInfo from './blog/personalInfo';
import { postSchema } from './blog/post';
import { postSeries } from './blog/postSeries';
import { rssSchema } from './blog/rss';
import siteSettings from './blog/siteSettings';
import { socialSchema } from './blog/social';
import tag from './blog/tag';
import { til } from './blog/til';
import { usesSchema } from './blog/uses';
// We import object and document schemas
import { blockContentField } from './customFields/blockContent';
import { codeField } from './customFields/codeField';
import { codePenField } from './customFields/codePenField';
import { dividerField } from './customFields/divider';
import { gifField } from './customFields/gif';
import { detailedImageField } from './customFields/imageField';
import { imageSliderField } from './customFields/imageSlider';
import { languageField } from './customFields/language';
import { tweetField } from './customFields/tweetField';
import { youtubeVideoField } from './customFields/youtubeVideoField';

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
     * Training Planner
     */
    trainingRoutineSchema,
    exerciseSchema,
    trainingSchema,
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
    codeField,
    detailedImageField,
  ]),
});
