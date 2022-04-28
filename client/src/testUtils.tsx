import React, { FC, ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import store from 'src/store'
import theme from 'src/styles/theme'

import 'jest-canvas-mock'
import 'src/locales/i18n'

const AllProviders: FC = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    </ThemeProvider>
  )
}

const customRender = (component: ReactElement, options?: RenderOptions) =>
  render(component, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
