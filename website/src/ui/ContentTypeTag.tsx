/**
 * This component is React because it's being used inside Algolia Hint, which is React-based
 */
import humanizeString from 'humanize-string';

import { mergeClasses } from '@/infrastructure/utils/misc';

export type Props = {
  type: 'post' | 'til' | 'codeSnippet';
};

export function ContentTypeTag({ type }: Props) {
  return (
    <span
      className={mergeClasses(
        {
          'bg-indigo-700': type === `post`,
          'bg-yellow-700': type === `til`,
          'bg-cyan-700': type === `codeSnippet`,
        },
        `px-1.5 py-0.5 rounded-sm min-w-[40px] text-center font-bold text-gray-50 uppercase`,
      )}
    >
      {humanizeString(type)}
    </span>
  );
}
