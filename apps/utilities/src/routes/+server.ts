import { redirect } from '@sveltejs/kit';

export function GET() {
  throw redirect(301, '/tools/average');
}
