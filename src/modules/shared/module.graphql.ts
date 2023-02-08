import { gql } from 'graphql-modules'

export default gql`
scalar Timestamp
scalar Date
scalar Cursor
scalar JSON
scalar DateTime

type PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor: Cursor
  endCursor: Cursor
  totalPageCount: Int
}

enum OrderDirection {
  asc
  desc
}

type Query {
  noop: Boolean
}

type Mutation {
  noop: Boolean
}

type BaseNode {
  id: ID!
}

type BaseDate {
  createdAt: DateTime!
  updatedAt: DateTime!
}

interface Error {
    message: String!
}

`
