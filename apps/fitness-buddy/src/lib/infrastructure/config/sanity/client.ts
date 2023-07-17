import { createClient } from '@sanity/client';

import { baseSanityConfig } from './baseConfig';

export const sanityApiClient = createClient({
	...baseSanityConfig,
	useCdn: false
});
