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
      as='h1'
      m='auto'
      mt={4}
      px={3}
      maxWidth='1534px'
      height='100px'
      maxHeight='100px'
      display='flex'
      justifyContent='center'
      justifyItems='center'
      onClick={handleClick}
      cursor='pointer'
    >
      Biker Camp
    </Box>
  )
}

export default Header
