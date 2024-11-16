import {documentInternationalization} from '@sanity/document-internationalization'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schema} from './schema'

export default defineConfig({
  name: 'default',
  title: 'raulmelo-cms',

  projectId: 'gc3hakk3',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        {id: 'en', title: 'English'},
        {id: 'pt', title: 'Portuguese'},
      ],
      schemaTypes: ['post', 'til'],
    }) as never,
    media() as never,
  ],
  schema: schema as never,
})
