import React, { useState } from 'react'

import { useLoginMutation } from 'src/apollo/mutations/login'
import Box from 'src/components/Box'

import Loading from 'components/Loading'

const LoginPage = ({
  changeLoginState,
}: {
  changeLoginState: (
    status: boolean | ((prevState: boolean) => boolean)
  ) => void
}) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [login, { loading, error }] = useLoginMutation()
  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    login({
      update(cache, { data: { login } }) {
        if (login.token) {
          localStorage.setItem('jwt', login.token)
          changeLoginState(true)
        }
      },
      variables: { userName, password },
    })
  }
  return (
    <Box
      display='flex'
      width='100%'
      justifyContent='center'
      height='100vh'
      alignItems='center'
      background='backgroundColor'
      flexDirection='column'
    >
      {!loading && (
        <form onSubmit={onSubmit}>
          <Box display='flex' flexDirection='column' alignItems='center'>
            <Box p={2} m={2}>
              <Box
                as='input'
                p={2}
                width='200px'
                placeholder='Username'
                type='text'
                onChange={(event: {
                  target: { value: React.SetStateAction<string> }
                }) => setUserName(event.target.value)}
              />
            </Box>
            <Box p={2} m={2}>
              <Box
                as='input'
                p={2}
                width='200px'
                placeholder='Password'
                type='password'
                onChange={(event: {
                  target: { value: React.SetStateAction<string> }
                }) => setPassword(event.target.value)}
              />
            </Box>
            <Box
              as='input'
              my={3}
              p={2}
              width='100px'
              type='submit'
              value='Login'
            />
          </Box>
        </form>
      )}
      {loading && <Loading />}
      {error && <p>There was an error logging in!</p>}
    </Box>
  )
}

export default LoginPage
