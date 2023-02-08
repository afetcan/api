import { GraphQLError } from 'graphql'
import { CONTEXT, Inject, Injectable, Scope } from 'graphql-modules'
import { UserEntity } from '@acildeprem/storage'
import { HStorage } from '../../shared/providers/storage'
import type { Context, SuperTokenSessionPayload } from '../../../context'
import { Logger } from '../../shared/providers/logger'
import { UserManager } from './user-manager.service'
import { NewUserOnboardInput } from './../../../__generated__/types'

/**
 * Responsible for auth checks.
 * Talks to Storage.
 */
@Injectable({
  scope: Scope.Operation,
  global: true,
})
export class AuthManager {
  private session: SuperTokenSessionPayload | null
  private logger: Logger

  constructor(
    @Inject(Logger) logger: Logger,
    @Inject(CONTEXT) context: Context,
    @Inject(UserManager) private userManager: UserManager,
    @Inject(HStorage) private storage: HStorage,
  ) {
    this.session = context.session || null
    this.logger = logger.child({
      source: 'AuthManager',
    })
  }

  getCurrentUser: () => Promise<(UserEntity) | never> = async () => {
    if (!this.session)
      throw new GraphQLError('Auth error' + 'Authorization token is missing')
    const user = await this.storage.userRepo.getUserBySuperTokenId({
      superTokensUserId: this.session.superTokensUserId,
    })
    if (!user)
      throw new GraphQLError('Auth error' + 'User not found')

    return user
  }

  async updateCurrentUser(input: { username: string; fullName: string }): Promise<UserEntity> {
    const user = await this.getCurrentUser()
    return await this.userManager.updateUser({
      id: user.id,
      ...input,
    })
  }

  async newUserOnboard(input: NewUserOnboardInput): Promise<UserEntity> {
    this.logger.info('New user onboard (input=%o)', input)
    const user = await this.getCurrentUser()
    return await this.storage.userRepo.newUserOnboard(user.id, input)
  }

  isUser() {
    return !!this.session
  }
}
