import React, { ChangeEvent, useEffect, useState, useRef } from 'react'
import { useQuery } from '@apollo/client'

import WarningBox from 'src/components/WarningBox'

import Box from 'components/Box'
import DetailModal from 'components/DetailModal'
import Loading from 'components/Loading'
import Pagination from 'components/Pagination'

import { GET_BIKES } from './BikeListPage.query'
import * as Styled from './BikeListPage.styled'
import { debounce } from 'lodash'

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
  const [totalBooked, setTotalBooked] = React.useState(0)
  const [activePage, setActivePage] = React.useState(1)
  const [activeType, setActiveType] = React.useState('')
  const [searchValue, setSearchValue] = React.useState('')
  const [selectedBike, setSelectedBike] = React.useState<BikeType>({})

  const { loading, error, data, refetch } = useQuery(GET_BIKES, {
    variables: { page: 1, bike_id: '', vehicle_type: '' },
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000)
    if (counter === 0) {
      refetch({
        page: activePage,
        vehicle_type: activeType,
        bike_id: searchValue,
      })
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
      setTotalBooked(data.bikeList?.total_booked || 0)
      setCounter(data.bikeList?.ttl || 30)
    }
  }, [data])

  const handlePageClick = (event: { selected: number }) => {
    setActivePage(event.selected + 1)
    refetch({ page: event.selected + 1 })
  }

  const handleRefresh = () => {
    setSearchValue('')
    refetch({ page: activePage, vehicle_type: activeType })
  }

  const setServicesValueDebounced = useRef(debounce( (value: string) => {
    return refetch({
      bike_id: value,
    }) as any
  }, 300))

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    setServicesValueDebounced.current(e.target.value)
  }

  const handleSelectType = (e: any) => {
    setActivePage(1)
    setActiveType(e.target.value)
    refetch({ vehicle_type: e.target.value, page: 1 })
  }

  const handleCloseModal = () => {
    setSelectedBike({})
  }

  const Refresh = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
    >
      <path d='M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z' />
    </svg>
  )


  if (loading) return <Loading />
  if (error) return <WarningBox>Error! {error.message}</WarningBox>

  return (
    <Box>
      <Box display='flex' justifyContent='space-between' flexWrap='wrap' mb={6}>
        <Box display='flex' justifyContent='flex-start' alignItems='center'>
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
              value={searchValue}
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
          <Box
            onClick={handleRefresh}
            width='24px'
            height='24px'
            cursor='pointer'
          >
            <Refresh />
          </Box>
        </Box>
        <Box display='flex' flexDirection='column' m={2}>
          <Box>Will refresh in: {counter} seconds</Box>
          <Box>Total Bookings of Listing Bikes: {totalBooked}</Box>
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
          currentPage={activePage - 1}
        />
      )}
      {selectedBike && Object.entries(selectedBike).length ? (
        <DetailModal onClose={handleCloseModal} selectedBike={selectedBike} />
      ) : null}
    </Box>
  )
}

export default BikeListPage
