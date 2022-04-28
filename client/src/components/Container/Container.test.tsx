import React from 'react'
import { render, screen } from '@testing-library/react'

import Container from './Container'

describe('<Container />', () => {
	const props = { id: 'containerId', children: 'container content' }

	it('should render as expected', () => {
		const { container } = render(<Container {...props} />)

		expect(container.firstChild.textContent).toBe(props.children)
		expect(container.querySelector(`#${props.id}`)).toBeInTheDocument()
		expect(screen.getByText(props.children)).toBeInTheDocument()
		expect(container.firstChild).toHaveStyle({
			width: '100%',
			'background-color': 'white',
			display: 'flex',
			'flex-direction': 'column',
		})
	})
})
