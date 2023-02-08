import { FactoryProvider, InjectionToken, Scope } from 'graphql-modules'
import { type PubSub as TPubSub, createPubSub } from 'graphql-yoga'
import { Logger } from './logger'

export type PubSub = TPubSub<{
  POST_ADDED: [library: any]
}>

export const EVENT_CONFIG = new InjectionToken<string>('EVENT_CONFIG')

export function eventTargetRedisProvider(value: ReturnType<typeof createPubSub>) {
  return {
    provide: EVENT_CONFIG,
    useValue: value,
    scope: Scope.Singleton,
  }
}

export const PubSubProvider: FactoryProvider<PubSub> = {
  provide: EVENT_CONFIG,
  useFactory(config: PubSub) {
    return config
  },
  deps: [EVENT_CONFIG, Logger],
}
