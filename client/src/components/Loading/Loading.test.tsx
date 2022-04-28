import React from 'react'
import * as redux from 'react-redux'
import { render } from '@testing-library/react'

import Loading from './Loading'

describe('<Loading />', () => {
	beforeEach(() => {
		jest.spyOn(redux, 'useSelector').mockImplementationOnce(() => true)
	})

	afterAll(() => {
		jest.clearAllMocks()
	})

	it('should render expected', () => {
		const { container } = render(<Loading />)
		const loadingContainer = container.querySelector('#loading')
		expect(loadingContainer).toBeInTheDocument()
	})

	it('should render internal', () => {
		const { container } = render(<Loading internal />)
		const loadingContainer = container.querySelector('#loading')
		expect(loadingContainer).toBeInTheDocument()
	})
})
