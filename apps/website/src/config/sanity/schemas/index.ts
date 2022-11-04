import { fitnessSchemaFields } from '@raulmelo/sanity-fitness';

// First, we must import the schema creator
// Then import schema types from any plugins that might expose them
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

// Then we give our schema to the builder and provide the result to Sanity
export const schema = {
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: [
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
    ...fitnessSchemaFields,
    /**
     * Fields
     */
    blockContentField,
    languageField,
    gifField,
    imageSliderField,
    tweetField,
    codePenField,
    dividerField,
    codeField,
    detailedImageField,
  ],
};
