import React from 'react'

import Box from 'components/Box'

import Footer from './Footer'
import Header from './Header'

interface LayoutProps {
  headerDisabled?: boolean
  children: React.ReactNode
}
const Layout: React.FC<LayoutProps> = props => {
	return (
		<Box display='flex' flex='1' flexDirection='column'>
			{!props.headerDisabled && (
				<Box
					display='flex'
					width='100%'
					alignItems='center'
					height='64px'
					borderStyle='solid'
					borderColor='border'
				>
					<Header />
				</Box>
			)}

			<Box flex='1' overflow='auto'>
				{props.children}
			</Box>
			<Box
				display='flex'
				width='100%'
				height='64px'
				justifyContent='center'
				alignItems='center'
				borderStyle='solid'
				borderColor='border'
			>
				<Footer />
			</Box>
		</Box>
	)
}

export default Layout
