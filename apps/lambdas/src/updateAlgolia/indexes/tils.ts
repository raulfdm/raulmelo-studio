import { api } from '../../utils/api';
import { AlgoliaObject, PushAlgoliaTuple } from '../types';

const INDEX_NAME = 'tils';
const QUERY = `
query Tils {
  tils{
    id
    title
    content
    locale
    slug
    
  }
}
`;

export async function getTilsToAlgolia(): Promise<PushAlgoliaTuple> {
  const {
    data: { tils },
  } = await api.query<TilGraphQLResponse>(QUERY);

  const algoliaData = tils.map(objectCreator);

  return [INDEX_NAME, algoliaData];
}

function objectCreator(til: Til): AlgoliaObject {
  const { id, content, ...rest } = til;

  const result: AlgoliaObject = {
    id,
    objectID: `Til_${id}`,
    excerpt: content.slice(0, 5000),
    ...rest,
  };

  return result;
}

/**
 * Types
 */

interface TilGraphQLResponse {
  data: Data;
}

interface Data {
  tils: Tils;
}

interface Til {
  id: string;
  title: string;
  content: string;
  locale: string;
  slug: string;
}

type Tils = Til[];
