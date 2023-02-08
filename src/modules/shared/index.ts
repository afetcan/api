import path from 'path'
import { fileURLToPath } from 'url'
import { createModule } from 'graphql-modules'

import { resolvers } from './resolvers.js'
import typeDefs from './module.graphql'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const sharedModule = createModule({
  id: 'shared',
  dirname: __dirname,
  typeDefs,
  resolvers,
})
