import express from 'express'
import path from 'path'
import helmet from 'helmet'
import cors from 'cors'
import compress from 'compression'
import services from './services'
const { JWT_SECRET } = process.env;

const root = path.join(__dirname, '../../')

const app = express()
app.use(compress())
if(process.env.NODE_ENV === 'production') {
	app.use(helmet())
	app.use(helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ['\'self\''],
			scriptSrc: ['\'self\'', '\'unsafe-inline\''],
			styleSrc: ['\'self\'', '\'unsafe-inline\''],
			imgSrc: ['\'self\'', 'data:', '*.amazonaws.com']
		}
	}))
	app.use(helmet.referrerPolicy({ policy: 'same-origin' }))
}
app.use(cors())
app.use('/', express.static(path.join(root, 'dist/client')))

app.get('/', (req, res) => {
	res.sendFile(path.join(root, '/dist/client/index.html'))
})

app.get('*', async (req, res) => {
  const token = req.cookies.get('authorization', { signed: true });
  var loggedIn;
  try {
    await JWT.verify(token, JWT_SECRET);
    loggedIn = true;
  } catch(e) {
    loggedIn = false;
  }
  const client = ApolloClient(req, loggedIn);
  const context= {};
  const App = (<Graphbook client={client} loggedIn={loggedIn} location={req.url} context={context}/>);
  renderToStringWithData(App).then((content) => {
    const initialState = client.extract();
    if (context.url) {
      res.redirect(301, context.url);
    } else {
      const head = Helmet.renderStatic();
      res.status(200);
      res.send(`<!doctype html>\n${template(content, head, initialState)}`);
      res.end();
    }
  });
});

const serviceNames = Object.keys(services)

for (const element of serviceNames) {
	const name = element
	if (name === 'graphql') {
		(async () => {
			await services[name].start()
			services[name].applyMiddleware({ app })
		})()
	} else {
		app.use(`/${name}`, services[name])
	}
}

app.listen(8000, () => console.log('Listening on port 8000!'))
