import {documentInternationalization} from '@sanity/document-internationalization'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schema} from './schema'
import {deskStructure} from './desk/deskStructure'
import {defaultDocumentNode} from './desk/previewDocumentNode'
import {LANGUAGES} from '@raulmelo/core/language'

export default defineConfig({
  name: 'default',
  title: 'raulmelo-cms',

  projectId: 'gc3hakk3',
  dataset: 'production',

  plugins: [
    structureTool({
      defaultDocumentNode,
      structure: deskStructure,
    }),
    visionTool(),
    documentInternationalization({
      supportedLanguages: LANGUAGES.allLanguages.map((lang) => ({
        id: lang.code,
        title: lang.name,
      })),
      schemaTypes: ['post', 'til'],
    }) as never,
    media() as never,
  ],
  schema: schema as never,
})
