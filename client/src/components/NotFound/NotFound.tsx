import React from 'react'
import { Link } from 'react-router-dom'

import Box from 'components/Box'

const NotFound: React.FC = () => {
	return (
		<Box className='page_404'>
			<h1>404</h1>
			<p>Oops! Something is wrong.</p>
			<Link className='button' to='/'>
				<i className='icon-home'></i> Go back in initial page, is better.
			</Link>
		</Box>
	)
}

export default NotFound
