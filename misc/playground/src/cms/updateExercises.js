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

try {
  const exercises = await raulClient.fetch(query);
  const transactions = camilaClient.transaction();

  for await (const exercise of exercises) {
    const { _id, _type, name, video, image } = exercise;
    if (!image?.url) {
      break;
    }

    const imageStream = got.stream(image.url);
    console.log('Uploading image for', name);
    const sanityImage = await camilaClient.assets.upload('image', imageStream);

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
  }

  await transactions.commit();
} catch (error) {
  console.log(error);
}
