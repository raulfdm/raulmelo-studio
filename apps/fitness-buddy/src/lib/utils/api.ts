import cookie from 'cookie';

export const SANITY_PROJECT_ID_COOKIE_KEY = 'sanity_projectId';

export function getProjectIdFromRequestCookie(request: Request): string {
  const parsedCookies = cookie.parse(request.headers.get('cookie') || '');
  return parsedCookies['sanity_projectId'];
}
