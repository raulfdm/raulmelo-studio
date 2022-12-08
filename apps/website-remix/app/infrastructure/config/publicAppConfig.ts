import { appConfig } from './index.server';

/**
 * Function to expose the environment variables to the client.
 * BE AWARE ABOUT WHAT YOU EXPOSE HERE.
 */
export function getPublicEnvironmentVariables() {
  return {
    search: appConfig.search,
  };
}

export type PublicEnv = ReturnType<typeof getPublicEnvironmentVariables>;

declare global {
  var ENV: PublicEnv;
  interface Window {
    ENV: PublicEnv;
  }
}
