import groq from 'groq';
import { z } from 'zod';
import { sanityApiClient } from '../config/sanity/client';

const query = groq`
*[_type == 'measurementSchema'] |  order(_createdAt desc)[0]{
  abdomen,
  weight,
  glute,
  shoulders,
  chest,
  
  biceps_left,
  forearm_left,
  biceps_right,
  forearm_right,

  thigh_left,
  calf_left,
  thigh_right,
  calf_right,
}
`;

export async function getMeasurements(): Promise<Measurement> {
	const result = await sanityApiClient.fetch(query);

	return measurementsSchema.parse(result);
}

const measurementsSchema = z.object({
	abdomen: z.number(),
	weight: z.number(),
	glute: z.number(),
	shoulders: z.number(),
	chest: z.number(),
	biceps_left: z.number(),
	forearm_left: z.number(),
	biceps_right: z.number(),
	forearm_right: z.number(),
	thigh_left: z.number(),
	calf_left: z.number(),
	thigh_right: z.number(),
	calf_right: z.number()
});

type Measurement = z.infer<typeof measurementsSchema>;
