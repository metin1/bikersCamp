import React from 'react'

import Spinner from 'components/Spinner'
import { InternalWrapper, Wrapper } from './Loading.styled'

interface ILoadingProps {
  internal?: boolean
  bg?: string
}

const Loading: React.FC<ILoadingProps> = props => {
  const LoadingWrapper = props.internal ? InternalWrapper : Wrapper

  return (
    <LoadingWrapper id='loading' show bg={props.bg}>
      <Spinner></Spinner>
    </LoadingWrapper>
  )
}

export default Loading
