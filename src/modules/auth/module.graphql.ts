import { gql } from 'graphql-modules'

export default gql`
extend type Query {
  me: User!
}

extend type Mutation {
  updateMe(input: UpdateMeInput!): UpdateMeResult!
  newUserOnboard(input: NewUserOnboardInput!): NewUserOnboardResult!
}

type User {
  id: ID!
  email: String!
  fullName: String!
  username: String!
  provider: AuthProvider!
  isAdmin: Boolean!
  isSuperAdmin: Boolean!
}


enum AuthProvider {
  GOOGLE
  GITHUB
  APPLE
}

input UpdateMeInput {
  fullName: String!
  username: String!
}

type UpdateMeInputErrors {
  fullName: String
  username: String
}

type UpdateMeError implements Error {
  message: String!
  """
  The detailed validation error messages for the input fields.
  """
  inputErrors: UpdateMeInputErrors!
}

type UpdateMeOk {
  updatedUser: User!
}

"""
@oneOf
"""
type UpdateMeResult {
  ok: UpdateMeOk
  error: UpdateMeError
}

input NewUserOnboardInput {
  fullName: String!
  username: String!
}

type NewUserOnboardInputErrors {
  fullName: String
  username: String
}

type NewUserOnboardError implements Error {
  message: String!
  """
  The detailed validation error messages for the input fields.
  """
  inputErrors: NewUserOnboardInputErrors!
}

type NewUserOnboardOk {
  updatedUser: User!
}

"""
@oneOf
"""
type NewUserOnboardResult {
  ok: NewUserOnboardOk
  error: NewUserOnboardError
}


`
