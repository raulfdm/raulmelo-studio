/// <reference types="@sveltejs/kit" />
import type { SupportedThemes } from './types';

declare global {
  interface Window {
    __theme: SupportedThemes;
  }
}
