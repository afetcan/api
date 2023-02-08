import { Inject, Injectable, Scope } from 'graphql-modules'
import { EntityManager } from '@mikro-orm/postgresql'
import { ResultInterface } from '@acildeprem/storage'
import { GraphQLError } from 'graphql'
import { MIKRO_ORM_INSTANCE } from '../../shared/providers/mikro-orm'
import { CreateEmergencyInput, Emergency } from '../../../__generated__/types'
import { HStorage } from '../../shared/providers/storage'
import { EVENT_CONFIG, type PubSub } from '../../shared/providers/pubsub'
import { AuthManager } from '../../auth/service/auth-manager.service'
@Injectable({
  scope: Scope.Operation,
})
export class EmergencyManager {
  constructor(
    // @Inject(Logger) private logger: Logger,
    @Inject(HStorage) private storage: HStorage,
    // @Inject(CONTEXT) private ctx: GraphQLModules.ModuleContext,
    // @Inject(REDIS_INSTANCE) private redis: Redis,
    @Inject(EVENT_CONFIG) private pubsub: PubSub,
    @Inject(MIKRO_ORM_INSTANCE) private orm: EntityManager,
    @Inject(AuthManager) private authManager: AuthManager,

  ) {
  }

  async createDebtList(data: CreateEmergencyInput): Promise<ResultInterface<Emergency>> {
    try {
      // const user = await this.authManager.getCurrentUser()
      const getData = await this.storage.debtRepo.createEmergency(data)
      if (!getData)
        return { data: undefined, isSuccess: false, message: 'Error' }

      let result: ResultInterface<Emergency>
      if (getData.data && getData.data.address)
        result = { data: { ...getData.data }, isSuccess: getData.isSuccess, message: getData.message }
      else
        result = { data: undefined, isSuccess: false, message: 'Error' }

      return result
    }
    catch (error) {
      throw new GraphQLError('Error create emergency')
    }
  }
}
