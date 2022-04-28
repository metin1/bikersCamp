import React from 'react'
import { Route, Switch } from 'react-router-dom'

import BikeListPage from 'src/pages/BikeListPage'
import NotFoundPage from 'src/pages/NotFoundPage'
import Footer from 'src/shared/layouts/footer'
import Header from 'src/shared/layouts/header'

import Box from 'components/Box'
import Container from 'components/Container'

const Routes = () => {
  return (
    <Box>
      <Header />
      <Container>
        <Switch>
          <Route exact path='/' component={BikeListPage} />
          <Route path='*' component={NotFoundPage} />
        </Switch>
      </Container>
      <Footer />
    </Box>
  )
}
export default Routes
