import path from 'path'
import { fileURLToPath } from 'url'
import { createModule } from 'graphql-modules'

import { resolvers } from './resolvers'
import { AuthManager } from './service/auth-manager.service'
import { UserManager } from './service/user-manager.service'
import typeDefs from './module.graphql'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const authModule = createModule({
  id: 'auth',
  dirname: __dirname,
  typeDefs,
  resolvers,
  providers: [AuthManager, UserManager],
})
