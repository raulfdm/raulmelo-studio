import { LocalizationProvider } from '$infrastructure/contexts/Localization';
import type { SupportedLanguages } from '@raulmelo/core';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import flat from 'flat';
import invariant from 'tiny-invariant';

export async function loader({ params }: LoaderArgs) {
  invariant(typeof params.locale === 'string', 'lang is required');

  const currentLocale = params.locale as SupportedLanguages;

  let messages: Record<string, string> = {};

  if (currentLocale === 'en') {
    messages = (await import(
      '$infrastructure/locales/en.json'
    )) as unknown as Record<string, string>;
  } else if (currentLocale === 'pt') {
    messages = (await import(
      '$infrastructure/locales/pt.json'
    )) as unknown as Record<string, string>;
  } else {
    throw new Error('Locale not supported');
  }
  console.log(typeof messages);

  return json({
    locale: params.locale as SupportedLanguages,
    messages: flat(messages) as Record<string, string>,
  });
}

export default function LocalizedRoute() {
  const { locale, messages } = useLoaderData<typeof loader>();

  return (
    <LocalizationProvider language={locale} messages={messages}>
      <Outlet />
    </LocalizationProvider>
  );
}
