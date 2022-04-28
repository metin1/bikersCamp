import React, { ChangeEvent, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import Pagination from 'components/Pagination'
import Box from 'components/Box'
import Loading from 'components/Loading'
import * as Styled from './BikeListPage.styled'
import { GET_BIKES } from './BikeListPage.query'

const BikeListPage = () => {
  const [bikeContent, setBikeContent] = useState([])
  const [counter, setCounter] = React.useState(50)
  const [totalBike, setTotalBike] = React.useState(0)
  const [activePage, setActivePage] = React.useState(1)
  const [activeType, setActiveType] = React.useState('')

  const { loading, error, data, refetch } = useQuery(GET_BIKES, {
    variables: { page: 1, bike_id: '', vehicle_type: '' },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000)
    if (counter === 0) {
      refetch({ page: activePage, vehicle_type: activeType })
    }
    return () => clearInterval(timer)
  }, [counter])

  useEffect(() => {
    if (data) {
      setBikeContent(data.bikeList?.data?.bikes || [data.bikeList?.data?.bike])
      setTotalBike(data.bikeList?.total_count || 0)
      setCounter(data.bikeList?.ttl || 30)
    }
  }, [data])

  const handlePageClick = (event: { selected: number }) => {
    setActivePage(event.selected + 1)
    refetch({ page: event.selected + 1 })
  }

  if (loading) return <Loading />
  if (error) return <div>Error! {error.message}</div>

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    refetch({ bike_id: e.target.value })
  }

  const handleSelectType = (e: any) => {
    setActiveType(e.target.value)
    refetch({ vehicle_type: e.target.value })
  }

  return (
    <Box>
      <Box display='flex' justifyContent='space-between' flexWrap='wrap' mb={6}>
        <Box display='flex' justifyContent='flex-start'>
          <Box
            display='flex'
            justifyItems='right'
            height='40px'
            placeholder='Search By Id'
            justifyContent='flex-start'
            mx={4}
          >
            <input
              style={{ padding: '8px' }}
              placeholder='Search By Id'
              type='text'
              onChange={handleSearch}
            />
          </Box>
          <Box
            display='flex'
            justifyItems='right'
            height='40px'
            placeholder='Search By Id'
            justifyContent='flex-end'
            mx={4}
          >
            <select
              style={{ padding: '8px' }}
              placeholder='Filter By Type'
              onChange={handleSelectType}
            >
              <option value=''>All</option>
              <option value='scooter'>Scooter</option>
              <option value='bike'>Bike</option>
            </select>
          </Box>
        </Box>
        <Box display='flex' flexDirection='column'>
          <Box>Will refresh in: {counter} seconds</Box>
          <Box>Total Bookings of Listing Bikes: {totalBike}</Box>
        </Box>
      </Box>
      <Box as='table' width='100%'>
        <thead>
          <Box as='tr' backgroundColor='tableBackground'>
            <Styled.Th>ID</Styled.Th>
            <Styled.Th>Type</Styled.Th>
            <Styled.Th>Action</Styled.Th>
          </Box>
        </thead>
        <tbody>
          {bikeContent?.map((bike: any, i: number) => (
            <Box
              as='tr'
              key={bike?.bike_id}
              backgroundColor={i % 2 === 1 ? 'tableBackground' : 'inherit'}
            >
              <Styled.Td>{bike?.bike_id}</Styled.Td>
              <Styled.Td>{bike?.vehicle_type}</Styled.Td>
              <Styled.Td>
                {bike?.is_reserved ? 'Reserved' : 'Available'}
              </Styled.Td>
            </Box>
          ))}
        </tbody>
      </Box>
      {data?.bikeList?.total_count > 10 && (
        <Pagination
          totalItems={data?.bikeList?.total_count}
          itemsPerPage={10}
          onPageClick={handlePageClick}
        />
      )}
    </Box>
  )
}

export default BikeListPage
