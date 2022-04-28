import React from 'react'

import Box from 'components/Box'

export interface WarningBoxProps {
  children: React.ReactNode
}

function WarningBox(props: WarningBoxProps) {
	return (
		<Box
			minHeight='80vh'
			width='100%'
			m='auto'
			display='flex'
			justifyContent='center'
			alignContent='center'
			fontSize='28px'
		>
			{props.children}
		</Box>
	)
}

export default WarningBox
