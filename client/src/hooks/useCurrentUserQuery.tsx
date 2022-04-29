import {
  gql,
  OperationVariables,
  QueryHookOptions,
  useQuery,
} from '@apollo/client'

export const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      username
    }
  }
`

export const useCurrentUserQuery = (
  options: QueryHookOptions<any, OperationVariables>
) => useQuery(GET_CURRENT_USER, options)
