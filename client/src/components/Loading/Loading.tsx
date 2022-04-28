import React from 'react'
import { useSelector } from 'react-redux'

import Spinner from 'components/Spinner'

import { globalLoadingSelector } from 'store/selectors'

import { InternalWrapper, Wrapper } from './Loading.styled'

interface ILoadingProps {
  internal?: boolean
  bg?: string
}

const Loading: React.FC<ILoadingProps> = props => {
	const isLoading: boolean = useSelector(globalLoadingSelector)
	const LoadingWrapper = props.internal ? InternalWrapper : Wrapper

	return (
		<LoadingWrapper id='loading' show={isLoading} bg={props.bg}>
			<Spinner></Spinner>
		</LoadingWrapper>
	)
}

export default Loading
