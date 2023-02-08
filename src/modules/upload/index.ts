import path from 'path'
import { fileURLToPath } from 'url'
import { createModule } from 'graphql-modules'

import { resolvers } from './resolvers'
import { UploadManager } from './service/upload-manager.service'

import typeDefs from './module.graphql'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const uploadModule = createModule({
  id: 'upload',
  dirname: __dirname,
  typeDefs,
  resolvers,
  providers: [UploadManager],
})
