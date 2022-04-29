import React, { useState } from 'react'

import { useLoginMutation } from 'src/apollo/mutations/login'
import WarningBox from 'src/components/WarningBox'

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
    <div className='login'>
      {!loading && (
        <form onSubmit={onSubmit}>
          <label>UserName</label>
          <input
            type='text'
            onChange={event => setUserName(event.target.value)}
          />
          <label>Password</label>
          <input
            type='password'
            onChange={event => setPassword(event.target.value)}
          />
          <input type='submit' value='Login' />
        </form>
      )}
      {loading && <Loading />}
      {error && (
        <WarningBox>
          <p>There was an error logging in!</p>
        </WarningBox>
      )}
    </div>
  )
}

export default LoginPage
