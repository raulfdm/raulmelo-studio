import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from './schema'

export default defineConfig({
  name: 'default',
  title: 'raulmelo-cms',

  projectId: 'gc3hakk3',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema,
})
