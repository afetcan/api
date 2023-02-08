import { composeResolvers } from '@graphql-tools/resolvers-composition'
// import {
//   fromGlobalId,
//   toGlobalId,
// } from 'graphql-relay'
import { EmergencyManager } from './service/emergency.service'
import { EmergencyModule } from './__generated__/types'

export const resolvers: EmergencyModule.Resolvers = {
  Mutation: {
    createEmergency: async (_, { data }, { injector }) => {
      const lib = injector.get(EmergencyManager)

      const createData = lib.createDebtList({
        ...data,
      })

      return createData
    },
  },
}

const Middleware = {
  // 'Query.emergencies': [isAuthenticated()],
}

const emergencyQueryResolver = composeResolvers(resolvers, Middleware)
export { emergencyQueryResolver }
