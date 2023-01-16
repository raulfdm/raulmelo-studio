import sanityClient from '@sanity/client';
import { baseSanityConfig } from './baseConfig';

export const sanityApiClient = sanityClient({
	...baseSanityConfig,
	useCdn: false
});
