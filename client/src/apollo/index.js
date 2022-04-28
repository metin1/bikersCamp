import { ApolloClient, from, HttpLink,InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const BASE_URL = process.env.API_SERVER_URL || 'http://localhost:8000/graphql'

const client = new ApolloClient({
	link: from([
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors) {
				graphQLErrors.map(({ message, locations, path }) =>
					console.log(`[GraphQL error]: Message: ${message}, Location:
        ${locations}, Path: ${path}`)
				)
				if (networkError) {
					console.log(`[Network error]: ${networkError}`)
				}
			}
		}),
		new HttpLink({
			uri: BASE_URL,
		}),
	]),
	cache: new InMemoryCache(),
})

export default client
