import { redirect } from '@remix-run/node';

export function loader() {
  return redirect(
    `https://docs.google.com/document/d/1xk0ChmPckqW85xtM1Hizx2tVbo2B61xjcpz-_dAH3f8`,
    {
      status: 301,
    },
  );
}
