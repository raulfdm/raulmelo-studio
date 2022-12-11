import { appConfig } from './index.server';

/**
 * Function to expose the environment variables to the client.
 * BE AWARE ABOUT WHAT YOU EXPOSE HERE.
 */
export function getPublicEnvironmentVariables() {
  const { adminApiKey, ...search } = appConfig.search;

  return {
    search,
    googleAnalyticsId: appConfig.googleAnalyticsId,
  };
}

export type PublicEnv = ReturnType<typeof getPublicEnvironmentVariables>;

declare global {
  const ENV: PublicEnv;
  interface Window {
    ENV: PublicEnv;
  }
}
