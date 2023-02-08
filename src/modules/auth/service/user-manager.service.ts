import { Inject, Injectable, Scope } from 'graphql-modules'
import { Logger } from '../../shared/providers/logger'
import { HStorage } from '../../shared/providers/storage'

export const usernameLengthBoundaries = {
  min: 2,
  max: 20,
} as const

export const fullNameLengthBoundaries = {
  min: 2,
  max: 20,
} as const

/**
 * Responsible for auth checks.
 * Talks to Storage.
 */
@Injectable({
  scope: Scope.Operation,
})
export class UserManager {
  private logger: Logger

  constructor(
    @Inject(Logger) logger: Logger,
    @Inject(HStorage) private storage: HStorage,
  ) {
    this.logger = logger.child({
      source: 'UserManager',
    })
  }

  async updateUser(input: { username: string; fullName: string; id: string }) {
    this.logger.info('Updating user (input=%o)', input)
    const data = await this.storage.userRepo.updateUser(input)
    if (!data)
      throw new Error('User not found')
    return data
  }
}
