import { previewConfig } from './config.preview';
import { productionConfig } from './config.production';
import { localConfig } from './config.local';

export function getConfig() {
  switch (process.env.APP_ENV) {
    case `local`: {
      return localConfig;
    }
    case `preview`: {
      return previewConfig;
    }
    case `production`: {
      return productionConfig;
    }
    default: {
      throw new Error(`Invalid APP_ENV ${process.env.APP_ENV}`);
    }
  }
}

export const appConfig = getConfig();
