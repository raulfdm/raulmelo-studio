import type { APIRoute } from 'astro';

import {
  getContentExportStaticPaths,
  renderContentExport,
} from '@/infrastructure/api/contentExports';

export const getStaticPaths = () => getContentExportStaticPaths(`post`);

export const GET: APIRoute = ({ params }) =>
  renderContentExport(`post`, params.slug!, `markdown`);
