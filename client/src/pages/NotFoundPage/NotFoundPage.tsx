import React from 'react'
import { Link } from 'react-router-dom'

import Container from 'components/Container'

const NotFoundPage: React.FC = () => {
	return (
		<Container>
			<h1>404</h1>
			<p>Oops! Something is wrong.</p>
			<Link className='button' to='/'>
				<i className='icon-home'></i> Go back in initial page, is better.
			</Link>
		</Container>
	)
}

export default NotFoundPage
