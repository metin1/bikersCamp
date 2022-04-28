import React from 'react'
import { render, screen } from '@testing-library/react'

import Box from './Box'

describe('<Box />', () => {
	const props = {
		key: 'propsKey',
		id: 'props-id',
		color: 'red',
		background: 'yellow',
	}

	afterAll(() => {
		jest.clearAllMocks()
	})

	it('should render as expected', async () => {
		const { container } = render(<Box {...props}>Children Component</Box>)
		const boxContainer = container.querySelector(`#${props.id}`)

		expect(boxContainer).toBeInTheDocument()
		expect(boxContainer).toHaveStyleRule('color', props.color)
		expect(boxContainer).toHaveStyleRule('background', props.background)
		expect(screen.getByText('Children Component')).toBeInTheDocument()
	})

	it('should render with click event', () => {
		const mockOnClick = jest.fn()
		render(
			<Box key='test-key' onClick={mockOnClick}>
        Children Component
			</Box>
		)
		screen.getByText('Children Component').click()
		expect(mockOnClick).toHaveBeenCalled()
	})
})
