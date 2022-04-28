import React from 'react'
import { StaticContext } from 'react-router'
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom'

import ErrorBoundary from 'src/shared/error/errorBoundary'

export const ErrorBoundaryRoute = ({
	component: Component,
	...rest
}: RouteProps) => {
	const encloseInErrorBoundary = (
		props: JSX.IntrinsicAttributes &
      RouteComponentProps<any, StaticContext, unknown> & {
        children?: React.ReactNode
      }
	) => (
		<ErrorBoundary>
			<Component {...props} />
		</ErrorBoundary>
	)

	if (!Component)
		throw new Error(
			`A component needs to be specified for path ${(rest as any).path}`
		)

	return <Route {...rest} render={encloseInErrorBoundary} />
}

export default ErrorBoundaryRoute
