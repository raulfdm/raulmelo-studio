import prismStyles from '@raulmelo/ui/styles/prism.css';
import baseUiStyles from '@raulmelo/ui/styles/style.css';
import appStyles from './styles/app.css';
import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export function links() {
  return [
    { rel: 'stylesheet', href: appStyles },
    { rel: 'stylesheet', href: prismStyles },
    { rel: 'stylesheet', href: baseUiStyles },
  ];
}

export function loader() {
  return json({
    message: 'Hello World',
  });
}

export default function App(...args: any) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
