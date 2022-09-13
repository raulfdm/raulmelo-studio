import sanityClient from '@sanity/client';
import { config } from 'dotenv';
import got from 'got';
import groq from 'groq';

config();

const raulClient = sanityClient({
  projectId: 'gc3hakk3',
  dataset: 'production',
  apiVersion: 'v1',
  useCdn: false,
});

const camilaClient = sanityClient({
  projectId: '17miagfv',
  dataset: 'production',
  apiVersion: 'v1',
  useCdn: false,
  token: process.env.CAMILA_SANITY_TOKEN,
});

const query = groq`
*[_type == "exercise"]{
  ...,
  "image": image.asset-> {
    url
  }
}
`;
let counter = 0;
const fails = [];

try {
  const exercises = await raulClient.fetch(query);
  console.log('Number of exercises:', exercises.length);

  exercises.forEach((exercise) => {
    if (exercise.image === undefined) {
      console.log(exercise._id);
    }
  });

  const transactions = camilaClient.transaction();

  console.log('Start the migration');
  for await (const exercise of exercises) {
    console.group();
    const { _id, _type, name, video, image } = exercise;

    console.log(`${++counter}. ${name}`);

    try {
      const imageStream = got.stream(image.url);
      console.log('Uploading image');
      const sanityImage = await camilaClient.assets.upload(
        'image',
        imageStream,
      );
      console.log('Image uploaded');

      transactions.createOrReplace({
        _id,
        _type,
        name,
        video,
        image: {
          _type: 'image',
          asset: {
            _ref: sanityImage._id,
            _type: 'reference',
          },
        },
      });
      console.log('Item added\n--------');
    } catch (error) {
      console.log('FAIL');
      fails.push({ _id, error, exercise });
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
