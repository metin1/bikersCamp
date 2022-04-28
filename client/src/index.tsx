import React from 'react'
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import axios from 'axios'
import { ThemeProvider } from 'styled-components'

import ErrorBoundary from 'src/shared/error/errorBoundary'
import theme from 'src/styles/theme'

import store from 'store/index'

import client from './apollo/index'
import App from './App'
import { ApolloProvider } from '@apollo/client/react'

ReactDOM.render(
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <HelmetProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </HelmetProvider>
        </Provider>
      </ThemeProvider>
    </ApolloProvider>
  </ErrorBoundary>,
  document.getElementById('root')
)
