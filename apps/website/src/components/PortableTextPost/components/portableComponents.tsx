import { BigQuote, DotDivider } from '@raulmelo/ui';

import { CodeComponent } from './Code';

export const portableComponents = {
  hardBreak: false,
  types: {
    divider: () => {
      return <DotDivider />;
    },
    bigQuote: (props: any) => {
      return <BigQuote {...props} />;
    },
    code: CodeComponent,
  },
};
