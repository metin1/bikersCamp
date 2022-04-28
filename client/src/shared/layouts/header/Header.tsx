import React, { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Box from 'src/components/Box/Box'

import { setSearch } from 'store/global/globalActions'

const Header: React.FC = () => {
	const dispatch = useDispatch()
	const history = useHistory()

	const handleClick = () => {
		history.push('/')
	}

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		history.push('/')
		dispatch(setSearch(e.target?.value))
	}

	return (
		<Box
			m='auto'
			mt={4}
			px={[7, 3, 7]}
			maxWidth='1534px'
			display='flex'
			justifyContent='space-around'
			justifyItems='center'
			onClick={handleClick}
			cursor='pointer'
		>
			<Box as='h1' width='100%' m={2} mb={4}>
        Biker Camp
			</Box>
			<Box
				display='flex'
				justifyItems='right'
				height='40px'
				minWidth={['300px', '150px', '300px']}
				placeholder='Search in bikes...'
				justifyContent='flex-end'
				mx={4}
			>
				<input
					style={{ padding: '8px' }}
					placeholder='Search in bikes...'
					type='text'
					onChange={handleSearch}
				/>
			</Box>
		</Box>
	)
}

export default Header
