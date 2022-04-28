import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

import styled from 'styled-components'
import Box from 'components/Box'

const StyledPaginate = styled(ReactPaginate).attrs({
  activeClassName: 'active',
})`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`

export interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  onPageClick: (event: { selected: number }) => void
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageClick,
}: PaginationProps) => {
  const [itemOffset, setItemOffset] = useState(0)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    setPageCount(Math.ceil(totalItems / itemsPerPage))
  }, [itemOffset, itemsPerPage])

  const handlePageClick = (event: { selected: number }) => {
    onPageClick(event)
    const newOffset = (event.selected * itemsPerPage) % totalItems
    setItemOffset(newOffset)
  }

  return (
    <Box mt={6}>
      <StyledPaginate
        breakLabel='...'
        nextLabel='Next >'
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel='< Previous'
        renderOnZeroPageCount={null}
      />
    </Box>
  )
}

export default Pagination
