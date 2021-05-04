import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): void {
  // ...
  res.setPreviewData({});
  res.end('Preview mode enabled');
  // ...
}
