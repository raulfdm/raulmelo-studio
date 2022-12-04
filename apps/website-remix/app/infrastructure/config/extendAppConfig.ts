import merge from 'lodash.merge';
import { baseConfig } from './config.base';
import type { AppConfig } from './types';

export function extendAppConfig(config: Partial<AppConfig> = {}): AppConfig {
  return merge({}, baseConfig, config);
}
