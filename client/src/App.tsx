import React, { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { BrowserRouter as Router } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import Loading from 'components/Loading'

import Routes from './routes'

const ReactApp: React.FC = () => {
  return (
    <Router>
      <Helmet defaultTitle='Biker Camp'>
        <title>Biker Camp</title>
      </Helmet>

      <Suspense fallback={<Loading />}>
        <Routes />
        <Loading />
      </Suspense>
    </Router>
  )
}

export default hot(module)(ReactApp)
