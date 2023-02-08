import { z } from 'zod'
import { AuthManager } from './service/auth-manager.service'
import { fullNameLengthBoundaries, usernameLengthBoundaries } from './service/user-manager.service'
import type { AuthModule } from './__generated__/types'

export const resolvers: AuthModule.Resolvers = {
  Query: {
    me: (_, __, { injector }) => injector.get(AuthManager).getCurrentUser(),
  },
  Mutation: {
    newUserOnboard: async (_, { input }, { injector }) => {
      const inputModal = z.object({
        fullName: z.string().min(fullNameLengthBoundaries.min).max(fullNameLengthBoundaries.max),
        username: z.string().min(usernameLengthBoundaries.min).max(usernameLengthBoundaries.max),
      })

      const result = inputModal.safeParse(input)

      if (!result.success) {
        return {
          error: {
            message: 'Please check your input.',
            inputErrors: {
              username: result.error.formErrors.fieldErrors.username?.[0],
              fullName: result.error.formErrors.fieldErrors.fullName?.[0],
            },
          },
        }
      }

      const updatedUser = await injector.get(AuthManager).newUserOnboard(input)

      return {
        ok: {
          updatedUser,
        },
      }
    },
    updateMe: async (_, { input }, { injector }) => {
      const InputModel = z.object({
        username: z
          .string()
          .min(usernameLengthBoundaries.min, 'Too short' + ` ${usernameLengthBoundaries.min}`)
          .max(usernameLengthBoundaries.max, 'Too long' + ` ${usernameLengthBoundaries.max}`),
        fullName: z.string().min(fullNameLengthBoundaries.min).max(fullNameLengthBoundaries.max),
      })
      const result = InputModel.safeParse(input)

      if (!result.success) {
        return {
          error: {
            message: 'Please check your input.',
            inputErrors: {
              username: result.error.formErrors.fieldErrors.username?.[0],
              fullName: result.error.formErrors.fieldErrors.fullName?.[0],
            },
          },
        }
      }

      const updatedUser = await injector.get(AuthManager).updateCurrentUser(input)

      return {
        ok: {
          updatedUser,
        },
      }
    },
  },
}
