import { createClient } from '@sanity/client';

import { env } from '$env/dynamic/private';

export const sanityClient = createClient({
	projectId: 'oy5o2ajk',
	dataset: 'production',
	useCdn: false, // set to `false` to bypass the edge cache
	token: env.SANITY_TOKEN,
	apiVersion: 'v1'
});
