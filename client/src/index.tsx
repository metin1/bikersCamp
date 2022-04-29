import React from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client/react'
import { ThemeProvider } from 'styled-components'

import client from 'src/apollo/index'
import ErrorBoundary from 'src/shared/error/errorBoundary'
import store from 'src/store/index'
import theme from 'src/styles/theme'

import App from './App'

ReactDOM.render(
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <HelmetProvider>
            <React.StrictMode>
              {/* @ts-ignore */}
              <App client={client} />
            </React.StrictMode>
          </HelmetProvider>
        </Provider>
      </ThemeProvider>
    </ApolloProvider>
  </ErrorBoundary>,
  document.getElementById('root')
)
