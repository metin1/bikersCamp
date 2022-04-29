import React, { Suspense, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import WarningBox from 'src/components/WarningBox'
import { useCurrentUserQuery } from 'src/hooks/useCurrentUserQuery'
import LoginPage from 'src/pages/LoginPage'

import Loading from 'components/Loading'

import Routes from './routes'

export interface AppProps {
  client: ApolloClient<NormalizedCacheObject>
}

const ReactApp: React.FC = ({ client }: AppProps) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwt'))
  const { error, refetch } = useCurrentUserQuery({})

  const handleLogin = (status: boolean | ((prevState: boolean) => boolean)) => {
    refetch()
      .then(() => {
        setLoggedIn(status)
      })
      .catch(() => {
        setLoggedIn(status)
      })
  }

  useEffect(() => {
    // @ts-ignore
    const unsubscribe = client.onClearStore(() => {
      if (loggedIn) {
        setLoggedIn(false)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <Router>
      <Helmet defaultTitle='Biker Camp'>
        <title>Biker Camp</title>
      </Helmet>

      <Suspense fallback={<Loading />}>
        {loggedIn && (
          <div>
            <Routes />
          </div>
        )}
        {!loggedIn && <LoginPage changeLoginState={handleLogin} />}
        {!loggedIn && error && (
          <WarningBox>
            <p>{error.message}</p>
          </WarningBox>
        )}
      </Suspense>
    </Router>
  )
}

export default hot(module)(ReactApp)
