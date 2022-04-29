import React from 'react'
import * as client from '@apollo/client'
import { QueryResult } from '@apollo/client'

import { fireEvent, render, screen } from 'src/testUtils'

import BikeListPage from './BikeListPage'
import mockData from './mock.json'

describe('<BikeListPage />', () => {
  const loading = false
  const error: any = null
  const data: any = mockData
  const refetch = jest.fn()

  beforeEach(() => {
    jest.spyOn(client, 'useQuery').mockReturnValue({
      loading,
      error,
      data,
      refetch,
    } as unknown as QueryResult)
  })

  it('should render as expected', () => {
    render(<BikeListPage />)

    expect(
      screen.getByText('Total Bookings of Listing Bikes: 500')
    ).toBeInTheDocument()
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Type')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()

    mockData.bikeList.data.bikes.forEach((bike: any) => {
      if (!bike) return
      if (bike.bike_id)
        expect(screen.getByText(bike.bike_id)).toBeInTheDocument()
      if (bike.vehicle_type)
        expect(screen.getAllByText(bike.vehicle_type).length).toBeGreaterThan(0)
    })
  })

  it('should show no data if no data fetch', () => {
    const emptyBikeArray: any[] = []
    const emptyBikeList = {
      ...mockData,
      bikeList: {
        ...mockData.bikeList,
        data: {
          bikes: emptyBikeArray,
        },
      },
    }

    jest.spyOn(client, 'useQuery').mockReturnValue({
      loading,
      error,
      data: emptyBikeList,
      refetch,
    } as unknown as QueryResult)

    render(<BikeListPage />)

    expect(screen.getByText('No Data')).toBeInTheDocument()
  })

  it('should show loading', () => {
    jest.spyOn(client, 'useQuery').mockReturnValue({
      loading: true,
      error,
      data,
      refetch,
    } as unknown as QueryResult)

    const { container } = render(<BikeListPage />)

    const loadingContainer = container.querySelector('#loading')
    expect(loadingContainer).toBeInTheDocument()
  })

  it('should show error', () => {
    jest.spyOn(client, 'useQuery').mockReturnValue({
      loading,
      error: { message: 'Fetch Error' },
      data,
      refetch,
    } as unknown as QueryResult)

    render(<BikeListPage />)

    expect(screen.getByText('Error! Fetch Error')).toBeInTheDocument()
  })

  it('should show detail', () => {
    render(<BikeListPage />)

    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    const firstBike = mockData.bikeList.data.bikes[0]

    expect(screen.getByText('Bike Detail')).toBeInTheDocument()
    expect(screen.getAllByText(firstBike.bike_id).length).toBeGreaterThan(0)
    expect(screen.getByText(firstBike.lat)).toBeInTheDocument()
    expect(screen.getByText(firstBike.lon)).toBeInTheDocument()
    expect(
      screen.getByText(firstBike.is_reserved ? 'Reserved' : 'Not Reserved')
    ).toBeInTheDocument()
    expect(
      screen.getByText(firstBike.is_disabled ? 'Disabled' : 'Not Disabled')
    ).toBeInTheDocument()
    expect(screen.getAllByText(firstBike.vehicle_type).length).toBeGreaterThan(
      0
    )
  })

  it('should refetch when page changed', () => {
    render(<BikeListPage />)

    const secondPage = screen.getByRole('button', { name: 'Page 2' })
    fireEvent.click(secondPage)
    expect(refetch).toHaveBeenCalledTimes(1)
  })
})
