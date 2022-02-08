import { domains } from '@raulmelo/core';
import { NextApiRequest, NextApiResponse } from 'next';

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

  const content = await domains.preview.queryPostOrTil(
    req.query.slug as string,
  );

  // If the slug doesn't exist prevent preview mode from being enabled
  if (content === null) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    maxAge: 60 * 60,
  });

  const contentPrePath = content.type === 'til' ? '/til' : '/blog';
  const partialPath = `${contentPrePath}/${content.slug}`;
  const Location = content.locale === 'pt' ? `/pt${partialPath}` : partialPath;

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, {
    Location,
  });

  res.end();
}
