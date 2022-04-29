import React from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ApolloProvider } from '@apollo/client/react'
import { ThemeProvider } from 'styled-components'

import client from 'src/apollo/index'
import ErrorBoundary from 'src/shared/error/errorBoundary'
import theme from 'src/styles/theme'

import App from './App'

ReactDOM.render(
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <HelmetProvider>
          <React.StrictMode>
            {/* @ts-ignore */}
            <App client={client} />
          </React.StrictMode>
        </HelmetProvider>
      </ThemeProvider>
    </ApolloProvider>
  </ErrorBoundary>,
  document.getElementById('root')
)
