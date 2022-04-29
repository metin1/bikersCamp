import React from 'react'

import Box from 'components/Box'

export const Td = ({ children }: any) => (
  <Box as='td' p={2}>
    {children}
  </Box>
)

export const Th = ({ children }: any) => (
  <Box as='th' p={3}>
    {children}
  </Box>
)
