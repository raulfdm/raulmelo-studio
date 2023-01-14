import groq from 'groq';

export function getTrainingSheetApi() {
	const TrainingSheetApi = {
		async getSheet(): Promise<ITrainingSheet> {
			return client.fetch(query);
		},
		async getById(
			key: string
		): Promise<({ _id: ITrainingSchema['_id'] } & ITrainingSchema['routine']) | undefined> {
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
              "youtubeVideoId": video.videoId
            }
          }
        }
      }
      `;

			const result = await client.fetch<ITrainingSchema>(query, { id: key });

			return {
				_id: result._id,
				...result.routine
			};
		}
	};

	return TrainingSheetApi;
}

interface Image {
	height: number;
	url: string;
	width: number;
}

interface Exercise {
	image?: Image;
	name: string;
	youtubeVideoId?: string;
}

export interface ITraining {
	advancedTechnique?: 'bi_set' | 'fst_7' | 'gvt' | 'rest_and_pause' | 'drop-set' | 'warm-up';
	exercise: Exercise;
	repetitions: string;
	restTime: number;
	series: number;
	_key: string;
}

export interface ITrainingRoutine {
	cardio?: {
		time: number;
	};
	date: Date;
	description: string;
	name: string;
	training: ITraining[];
}

export interface ITrainingSchema {
	_id: string;
	routine: ITrainingRoutine;
}

export interface ITrainingSheet {
	_id: string;
	schema: ITrainingSchema[];
	title: string;
}
