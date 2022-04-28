import React from 'react'

import { DesignSystemProps } from 'src/styles/styled'

import Box from 'components/Box'

export type IContainerProps = DesignSystemProps & {
  id?: string
  color?: string
  maxWidth?: string
  children: string | React.ReactNode
}

const Container = (props: IContainerProps) => {
  return (
    <Box
      p={[3, 5, 7]}
      width='90%'
      minHeight='calc(100vh - 194px)'
      maxWidth={props.maxWidth}
      bg='white'
      mx='auto'
      mt={4}
      mb={8}
      display='flex'
      flexDirection='column'
      borderRadius={2}
      {...props}
    />
  )
}

Container.defaultProps = {
  maxWidth: '1600',
}

export default Container
