import React, { Suspense, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { BrowserRouter as Router } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import Loading from 'components/Loading'
import LoginPage from 'src/pages/LoginPage'
import WarningBox from 'src/components/WarningBox'

import Routes from './routes'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { useCurrentUserQuery } from 'src/hooks/useCurrentUserQuery'

export interface AppProps {
  client: ApolloClient<NormalizedCacheObject>
}

const ReactApp: React.FC = ({ client }: AppProps) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwt'))
  const { data, error, loading, refetch } = useCurrentUserQuery({})

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
