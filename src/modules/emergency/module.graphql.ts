import { gql } from 'graphql-modules'

export default gql`
input CreateEmergencyInput {
  latitude: Float
  longitude: Float
  address: String
  name: String
  surname: String
  phone: String
}

type Emergency {
  id: ID!
  createdAt: DateTime
  updatedAt: DateTime
  latitude: Float
  longitude: Float
  address: String
  name: String
  surname: String
  phone: String
}

type CreateEmergencyResult {
  isSuccess: Boolean!
  message: String!
  data: Emergency
}



extend type Mutation {
createEmergency(data: CreateEmergencyInput!): CreateEmergencyResult!
}

`
