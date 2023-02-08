import { FactoryProvider, InjectionToken } from 'graphql-modules'
import { MikroORM } from '@mikro-orm/postgresql'
import { EntityManager } from '@mikro-orm/knex'
import { Logger } from './logger.js'

export const MIKRO_ORM_CONFIG = new InjectionToken<MikroORM>('MIKRO_ORM')
export const MIKRO_ORM_INSTANCE = new InjectionToken<EntityManager>('MIKRO_ORM_INSTANCE')

export const OrmProvider: FactoryProvider<EntityManager> = {
  provide: MIKRO_ORM_INSTANCE,
  useFactory(config: MikroORM) {
    return config.em.fork()
  },
  deps: [MIKRO_ORM_CONFIG, Logger],
}
