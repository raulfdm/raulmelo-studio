import { config } from '@/infrastructure/config/server';
import type { APIContext } from 'astro';

export function GET({ redirect }: APIContext) {
  return redirect(config.cvURL, 307);
}
