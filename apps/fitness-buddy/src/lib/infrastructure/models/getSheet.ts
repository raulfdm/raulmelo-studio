import groq from 'groq';
import { z } from 'zod';
import { sanityApiClient } from '../config/sanity/client';

const query = groq`
  *[_type=="trainingSchema"]|order(_createdAt desc)[0]{
    title,
    _id,
    schema[] -> {
      _id,
      routine{
        ...,
        training[] {
          ...,
          exercise ->{
             name,
            "image": image.asset->{
              url,
              "width": metadata.dimensions.width,
              "height": metadata.dimensions.height,
            },
            "youtubeVideoId": video.videoId
          }
        }
      }
    }
  }
  `;

export async function getSheet(): Promise<Sheet> {
	const result = await sanityApiClient.fetch(query);

	return sheetSchema.parse(result);
}

const exerciseSchema = z.object({
	image: z
		.object({
			height: z.number(),
			url: z.string(),
			width: z.number()
		})
		.optional(),
	name: z.string(),
	youtubeVideoId: z.string().optional()
});

const trainingSchema = z.object({
	advancedTechnique: z
		.enum(['bi_set', 'fst_7', 'gvt', 'rest_and_pause', 'drop-set', 'warm-up'])
		.optional(),
	exercise: exerciseSchema,
	repetitions: z.string(),
	restTime: z.number(),
	series: z.number(),
	_key: z.string()
});

const routineSchema = z.object({
	cardio: z
		.object({
			time: z.number()
		})
		.optional(),
	date: z.string(),
	description: z.string(),
	name: z.string(),
	training: z.array(trainingSchema).optional()
});

export const sheetTrainingSchema = z.object({
	_id: z.string(),
	routine: routineSchema
});

export type SheetTraining = z.infer<typeof sheetTrainingSchema>;

const sheetSchema = z.object({
	_id: z.string(),
	title: z.string(),
	schema: z.array(sheetTrainingSchema)
});

export type Sheet = z.infer<typeof sheetSchema>;
