import { gql } from 'graphql-modules'

export default gql`

scalar File

extend type Mutation {
  profileImageUpload(file: File!): String!
}

`
