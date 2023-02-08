import path from 'path'
import { fileURLToPath } from 'url'
import { createModule } from 'graphql-modules'
import { EmergencyManager } from './service/emergency.service'

import { resolvers } from './resolvers'
import typeDefs from './module.graphql'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const emergencyModule = createModule({
  id: 'emergency',
  dirname: __dirname,
  typeDefs,
  resolvers,
  providers: [EmergencyManager],
})
