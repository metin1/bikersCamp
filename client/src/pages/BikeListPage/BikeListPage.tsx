import React, { ChangeEvent, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import WarningBox from 'src/components/WarningBox'

import Box from 'components/Box'
import DetailModal from 'components/DetailModal'
import Loading from 'components/Loading'
import Pagination from 'components/Pagination'

import { GET_BIKES } from './BikeListPage.query'
import * as Styled from './BikeListPage.styled'

export interface BikeType {
  bike_id?: string
  lat?: number
  lon?: number
  is_reserved?: number
  is_disabled?: boolean
  vehicle_type?: string
  total_bookings?: string
  android?: string
  ios?: string
}

const BikeListPage = () => {
  const [bikeContent, setBikeContent] = useState([])
  const [counter, setCounter] = React.useState(50)
  const [totalBike, setTotalBike] = React.useState(0)
  const [activePage, setActivePage] = React.useState(1)
  const [activeType, setActiveType] = React.useState('')
  const [selectedBike, setSelectedBike] = React.useState<BikeType>({})

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
      setBikeContent(
        data.bikeList?.data?.bikes ||
          (data.bikeList?.data?.bike && [data.bikeList?.data?.bike]) ||
          []
      )
      setTotalBike(data.bikeList?.total_count || 0)
      setCounter(data.bikeList?.ttl || 30)
    }
  }, [data])

  const handlePageClick = (event: { selected: number }) => {
    setActivePage(event.selected + 1)
    refetch({ page: event.selected + 1 })
  }

  if (loading) return <Loading />
  if (error) return <WarningBox>Error! {error.message}</WarningBox>

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    refetch({ bike_id: e.target.value })
  }

  const handleSelectType = (e: any) => {
    setActiveType(e.target.value)
    refetch({ vehicle_type: e.target.value })
  }

  const handleCloseModal = () => {
    setSelectedBike({})
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
            m={2}
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
            m={2}
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
        <Box display='flex' flexDirection='column' m={2}>
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
          {bikeContent.length ? (
            bikeContent?.map((bike: any, i: number) => (
              <Box
                as='tr'
                key={bike?.bike_id}
                backgroundColor={i % 2 === 1 ? 'tableBackground' : 'inherit'}
              >
                <Styled.Td>{bike?.bike_id}</Styled.Td>
                <Styled.Td>{bike?.vehicle_type}</Styled.Td>
                <Styled.Td>
                  <Box
                    as='button'
                    backgroundColor='lightGrey'
                    color='link'
                    p={2}
                    cursor='pointer'
                    onClick={() => setSelectedBike(bike)}
                  >
                    Show Detail
                  </Box>
                </Styled.Td>
              </Box>
            ))
          ) : (
            <Box as='tr' width='100%' textAlign='center' mt={2} p={2}>
              <td colSpan={3}>No Data</td>
            </Box>
          )}
        </tbody>
      </Box>
      {data?.bikeList?.total_count > 10 && bikeContent.length > 1 && (
        <Pagination
          totalItems={data?.bikeList?.total_count}
          itemsPerPage={10}
          onPageClick={handlePageClick}
        />
      )}
      {selectedBike && Object.entries(selectedBike).length ? (
        <DetailModal onClose={handleCloseModal} selectedBike={selectedBike} />
      ) : null}
    </Box>
  )
}

export default BikeListPage
