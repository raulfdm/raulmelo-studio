import { getPathnameWithoutLocale } from '$infrastructure/utils/url';
import { useLocation } from 'react-use';

export function useAppLocation() {
  const { pathname, ...rest } = useLocation();

  return {
    ...rest,
    pathname,
    pathnameWithoutLocale: getPathnameWithoutLocale(pathname || ''),
  };
}
