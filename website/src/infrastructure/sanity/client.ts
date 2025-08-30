import { createClient } from '@sanity/client';

import { config } from '../config/server';

export const sanityClient = createClient(config.sanity);
