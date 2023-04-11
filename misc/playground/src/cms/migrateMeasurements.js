import path from 'node:path';
import * as url from 'node:url';

import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import groq from 'groq';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const raulClient = createClient({
  projectId: 'gc3hakk3',
  dataset: 'production',
  apiVersion: 'v1',
  useCdn: false,
});

if (!process.env.SANITY_TOKEN) {
  throw new Error('Missing Sanity token. Please add it to the .env file');
}

const newClient = createClient({
  projectId: 'oy5o2ajk',
  dataset: 'production',
  apiVersion: 'v1',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

const query = groq`
*[_type == "measurementSchema"]{
  ...,
}
`;

let counter = 0;
const fails = [];

try {
  const measurements = await raulClient.fetch(query);

  console.log('Number of routines:', measurements.length);

  const transactions = newClient.transaction();

  console.log('Start the migration');
  for await (const measurement of measurements) {
    console.group();

    console.log(`Routine ${++counter}`);

    try {
      transactions.createOrReplace(measurement);
      console.log('Item added\n--------');
    } catch (error) {
      console.log('FAIL');
      fails.push({ id: measurement._id, error, measurement });
    }

    console.groupEnd();
  }

  console.log('Committing the transaction');
  await transactions.commit();
  console.log('Migration completed');
} catch (error) {
  console.log(error);
}

if (fails.length > 0) {
  console.log(fails);
}
