import { w as t } from './index-d5338481.js';
const e = t('idle'),
  a = {
    beep: () => {
      e.update(() => 'beeping');
    },
    finish: () => {
      e.update(() => 'idle');
    },
  };
export { a, e as b };
