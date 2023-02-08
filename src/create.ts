import fs from 'fs'
import { Provider, Scope, createApplication } from 'graphql-modules'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { lexicographicSortSchema, printSchema } from 'graphql'

import { MikroORM } from '@mikro-orm/postgresql'
import type { S3Client } from '@aws-sdk/client-s3'
import { Logger } from './modules/shared/providers/logger'
import { REDIS_CONFIG, RedisConfig, RedisProvider } from './modules/shared/providers/redis'
import { CryptoProvider, encryptionSecretProvider } from './modules/shared/providers/crypto'
import { PubSub, PubSubProvider, eventTargetRedisProvider } from './modules/shared/providers/pubsub'
import { emergencyModule } from './modules/emergency'
import { MIKRO_ORM_CONFIG, OrmProvider } from './modules/shared/providers/mikro-orm'
import { sharedModule } from './modules/shared'
import { HStorage } from './modules/shared/providers/storage'
import { authModule } from './modules/auth'
import { uploadModule } from './modules/upload'
import { ArtifactStorageWriter } from './modules/shared/providers/artifact-storage-writer'

const modules = [
  emergencyModule,
  sharedModule,
  authModule,
  uploadModule,
]

export function createRegistry({
  logger,
  redis,
  encryptionSecret,
  eventTarget,
  orm,
  storage,
  s3,
}: {
  logger: Logger
  redis: RedisConfig
  eventTarget: PubSub
  orm: MikroORM
  encryptionSecret: string
  storage: HStorage
  s3: {
    client: S3Client
    bucketName: string
  }
}) {
  const artifactStorageWriter = new ArtifactStorageWriter(s3.client, s3.bucketName)

  const providersa = [
    RedisProvider,
    CryptoProvider,
    PubSubProvider,
    OrmProvider,
    {
      provide: ArtifactStorageWriter,
      useValue: artifactStorageWriter,
    },
    {
      provide: Logger,
      useValue: logger,
      scope: Scope.Singleton,
    } as Provider,
    {
      provide: REDIS_CONFIG,
      useValue: redis,
      scope: Scope.Singleton,
    } as Provider,
    {
      provide: MIKRO_ORM_CONFIG,
      useValue: orm,
      scope: Scope.Singleton,
    } as Provider,
    {
      provide: HStorage,
      useValue: storage,
      scope: Scope.Singleton,
    },
    encryptionSecretProvider(encryptionSecret),
    eventTargetRedisProvider(eventTarget),
  ]

  const createModule = createApplication({
    modules,
    providers: providersa,
    schemaBuilder: ({ typeDefs, resolvers }) =>
      makeExecutableSchema({ typeDefs, resolvers }),
  })

  const data = printSchema(lexicographicSortSchema(createModule.schema))
  // Save file to disk
  fs.writeFileSync('./schema.graphql', data)

  return createModule
}
