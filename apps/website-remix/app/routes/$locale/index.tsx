import { useLocalization } from '$infrastructure/contexts/Localization';
import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';

const availableLocales = ['en', 'pt'];

export function loader({ context, params, request }: LoaderArgs) {
  invariant(typeof params.locale === 'string', 'lang is required');

  // if (!availableLocales.includes(params.lang)) {
  //   return redirect('/en');
  // }

  return null;
}

export default function Index() {
  // const all = useLocalization();

  // console.log(all);
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
            className="underline"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
