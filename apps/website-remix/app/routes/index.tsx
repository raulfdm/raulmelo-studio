import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

export function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);

  if (url.pathname === '/') {
    return redirect('/en');
  }

  return null;
}
