import React from 'react'
import { useHistory } from 'react-router-dom'

import Box from 'src/components/Box/Box'

const Header: React.FC = () => {
  const history = useHistory()

  const handleClick = () => {
    history.push('/')
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
    </Box>
  )
}

export default Header
