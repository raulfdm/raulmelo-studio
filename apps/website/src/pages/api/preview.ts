import { Backend, graphqlVariables } from '@services/Backend';
import { SupportedLanguages } from '@types-app';
import { utils } from '@raulfdm/core';
import { NextApiRequest, NextApiResponse } from 'next';

const { head, isNil } = utils;

type Content = { slug: string; locale: SupportedLanguages };

type GraphqlResponse = {
  tils: Content[];
  posts: Content[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS

  if (
    req.query.secret !== process.env.STRAPI_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const query = `
    query Tils($where: JSON) {
      tils(locale: "all", where: $where) {
        slug
        locale
      }
      posts(locale: "all", where: $where){
        slug
        locale
      }
    }
  `;

  const { tils, posts } = await Backend.graphql<GraphqlResponse>(query, {
    where: {
      ...graphqlVariables.preview,
      slug: req.query.slug as string,
    },
  });

  const til = head(tils);
  const post = head(posts);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (isNil(til) && isNil(post)) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    maxAge: 60 * 60,
  });

  const contentType = til ? 'til' : 'blog';
  const content = (til ?? post) as Content;

  const Location =
    content.locale === 'pt'
      ? `/pt/${contentType}/${content.slug}`
      : `/${contentType}/${content.slug}`;

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, {
    Location: Location,
  });

  res.end();
}
