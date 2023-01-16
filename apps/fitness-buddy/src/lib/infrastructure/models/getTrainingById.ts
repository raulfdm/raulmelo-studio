import groq from 'groq';
import { sanityApiClient } from '../config/sanity/client';
import { sheetTrainingSchema } from './getSheet';

const query = groq`
*[_type=="trainingRoutine" && _id == $id][0]{
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
        "youtubeVideoId": video.videoId,
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
    }
  }
}
`;

export async function getTrainingById(id: string) {
	const result = await sanityApiClient.fetch(query, { id });

	return sheetTrainingSchema.parse(result);
}
