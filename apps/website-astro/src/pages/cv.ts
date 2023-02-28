import { type APIContext } from 'astro';

export function get({ redirect }: APIContext) {
  return redirect(
    `https://docs.google.com/document/d/1xk0ChmPckqW85xtM1Hizx2tVbo2B61xjcpz-_dAH3f8`,
    307,
  );
}
