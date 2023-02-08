import { FactoryProvider, InjectionToken } from 'graphql-modules'
import { type ClickHouseClient, type ClickHouseClientConfigOptions, createClient } from '@clickhouse/client'
import { Logger } from './logger.js'

export const CLICKHOUSE_CONFIG = new InjectionToken<ClickHouseClientConfigOptions>('CLICKHOUSE_CONFIG')
export const CLICKHOUSE_INSTANCE = new InjectionToken<ClickHouseClient>('CLICKHOUSE_INSTANCE')

export const RedisProvider: FactoryProvider<ClickHouseClient> = {
  provide: CLICKHOUSE_INSTANCE,
  useFactory(config: ClickHouseClientConfigOptions, mainLogger: Logger) {
    const logger = mainLogger.child({
      source: 'Redis',
    })

    const client = createClient({
      host: config.host,
      password: config.password,
      username: config.username,
      database: config.database,
    })

    return client
  },
  deps: [CLICKHOUSE_CONFIG, Logger],
}
