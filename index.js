import express from 'express'
import path from 'path'
import helmet from 'helmet'
import cors from 'cors'
import compress from 'compression'
import services from './services'

// require('dotenv').config()

const root = path.join(__dirname, '../../')

const app = express()
app.use(compress())
if (process.env.NODE_ENV === 'production') {
  app.use(helmet())
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', '*.amazonaws.com'],
      },
    })
  )
  app.use(helmet.referrerPolicy({ policy: 'same-origin' }))
}
app.use(cors())
app.use('/', express.static(path.join(root, 'client/build')))

app.get('/', (req, res) => {
  res.sendFile(path.join(root, '/client/build/index.html'))
})
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('app/client/build'))
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'app/client/build', 'index.html'))
  })
  // app.use(express.static('client/build'))
  // app.get('*', (req, res) => {
  //   res.setHeader('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict')
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  // })
}

const serviceNames = Object.keys(services)

for (const element of serviceNames) {
  const name = element
  if (name === 'graphql') {
    ;(async () => {
      await services[name].start()
      services[name].applyMiddleware({ app })
    })()
  } else {
    app.use(`/${name}`, services[name])
  }
}
const PORT = process.env.PORT || 3000

module.exports = app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))
