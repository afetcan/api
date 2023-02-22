import type { EntityManager } from '@mikro-orm/postgresql'
import type { FastifyReply, FastifyRequest } from 'fastify'
// import type { LibraryEntity } from '@@afetcan/storage'
import zod from 'zod'
import type { PubSub as TPubSub } from 'graphql-yoga'
import type { Redis } from 'ioredis'

export interface Context {
  req: FastifyRequest
  reply: FastifyReply
  headers: Record<string, string | string[] | undefined>
  requestId?: string | null
  session: SuperTokenSessionPayload | null
  orm: EntityManager
  redis: Redis
  pubSub: PubSub
  locale: string
}

declare global {
  namespace GraphQLModules {
    interface GlobalContext {
      req: FastifyRequest
      reply: FastifyReply
      headers: Record<string, string | string[] | undefined>
      requestId?: string | null
      session: SuperTokenSessionPayload | null
      orm: EntityManager
      redis: Redis
      pubSub: PubSub
      locale: string
    }
  }
}

const SuperTokenAccessTokenModel = zod.object({
  version: zod.literal('1'),
  superTokensUserId: zod.string(),
  /**
         * Supertokens for some reason omits externalUserId from the access token payload if it is null.
         */
  externalUserId: zod.optional(zod.union([zod.string(), zod.null()])),
  email: zod.string(),
})

export type SuperTokenSessionPayload = zod.TypeOf<typeof SuperTokenAccessTokenModel>

export type PubSub = TPubSub<{
  POST_ADDED: [library: any]
}>
