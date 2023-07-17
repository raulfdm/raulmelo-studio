import groq from 'groq';
import { z } from 'zod';

import { sanityApiClient } from '../config/sanity/client';

const query = groq`
*[_type == "exercise"]{
  _id,
  name,
  "image": image.asset->{
    url,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height,
  },
  video,
  alternatives[] -> {
    _id,
    name,
    "image": image.asset->{
      url,
      "width": metadata.dimensions.width,
      "height": metadata.dimensions.height,
    },
  }
}
`;

export async function getAllExercises() {
	const result = await sanityApiClient.fetch(query);

	return exercisesSchema.parse(result);
}

const imageSchema = z.object({
	url: z.string(),
	width: z.number(),
	height: z.number()
});

const exerciseSchema = z.object({
	_id: z.string(),
	name: z.string(),
	image: imageSchema,
	video: z.object({
		videoId: z.string()
	}),
	alternatives: z
		.array(
			z.object({
				_id: z.string(),
				name: z.string(),
				image: imageSchema
			})
		)
		.optional()
});

export type ExerciseItem = z.infer<typeof exerciseSchema>;

const exercisesSchema = z.array(exerciseSchema);
