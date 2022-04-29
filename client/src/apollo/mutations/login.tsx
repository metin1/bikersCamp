import { gql, useMutation } from '@apollo/client'

export const LOGIN = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      token
    }
  }
`

export const useLoginMutation = () => useMutation(LOGIN)
