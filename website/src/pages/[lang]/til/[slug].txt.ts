import type { APIRoute } from 'astro';

import {
  getContentExportStaticPaths,
  renderContentExport,
} from '@/infrastructure/api/contentExports';

export const getStaticPaths = () => getContentExportStaticPaths(`til`);

export const GET: APIRoute = ({ params }) =>
  renderContentExport(`til`, params.slug!, `text`);
