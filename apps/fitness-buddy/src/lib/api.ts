import sanityClient from '@sanity/client';
import groq from 'groq';

const client = sanityClient({
  projectId: 'gc3hakk3',
  dataset: 'production',
  apiVersion: 'v1',
  useCdn: false,
});

export const TrainingSheetApi = {
  async getSheet(): Promise<ITrainingSheet> {
    const query = groq`
*[_type=="trainingSchema"][0]{
  title,
  schema[]{
    _key,
    routine {
      name,
      description,
      date,
      "cardioTime": cardio.time,
      training[] {
        repetitions,
        restTime,
        series,
        advancedTechnique,
        "exercise": exercise->{
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

    return client.fetch(query);
  },
  async getByKeY(key: string): Promise<ITrainingSchema['routine'] | undefined> {
    const { schema } = await TrainingSheetApi.getSheet();

    const training = schema.find((training) => training._key === key);

    return training?.routine;
  },
};

interface Image {
  height: number;
  url: string;
  width: number;
}

interface Exercise {
  image: Image;
  name: string;
  youtubeVideoId: string;
}

export interface ITraining {
  advancedTechnique?:
    | 'bi_set'
    | 'fst_7'
    | 'gvt'
    | 'rest_and_pause'
    | 'drop-set';
  exercise: Exercise;
  repetitions: string;
  restTime: number;
  series: number;
}

export interface ITrainingRoutine {
  cardioTime: number;
  date: Date;
  description: string;
  name: string;
  training: ITraining[];
}

export interface ITrainingSchema {
  _key: string;
  routine: ITrainingRoutine;
}

export interface ITrainingSheet {
  schema: ITrainingSchema[];
  title: string;
}
