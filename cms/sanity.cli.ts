import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'gc3hakk3',
    dataset: 'production',
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
  vite: {
    build: {
      /**
       * Fixes this:
       *
       * static/sanity-!~{001}~.js:21651:0: ERROR: Top-level await is not available in the configured target environment ("chrome87", "edge88", "es2020", "firefox78", "safari14" + 3 overrides)
       */
      target: 'es2022',
    },
  },
})
