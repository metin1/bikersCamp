import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { gql, useMutation, useQuery } from '@apollo/client'
import { divide } from 'lodash'

const GET_BIKES = gql`
  query bikesFeed($page: Int) {
    bikesFeed(page: $page, limit: $limit) {
      bikes {
        id
        text
        user {
          avatar
          username
        }
      }
    }
  }
`

const ADD_BIKE = gql`
  mutation addBike($bike: BikeInput!) {
    addBike(bike: $bike) {
      id
      text
      user {
        username
        avatar
      }
    }
  }
`

const Feed = () => {
  const [bikeContent, setBikeContent] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const { loading, error, data, fetchMore } = useQuery(GET_BIKES, {
    pollInterval: 5000,
    variables: { page: 0, limit: 10 },
  })

  const loadMore = (fetchMore: any) => {
    fetchMore({
      variables: {
        page: page + 1,
      },
      updateQuery(
        previousResult: { bikesFeed: { bikes: any } },
        { fetchMoreResult }: any
      ) {
        if (!fetchMoreResult.bikesFeed.bikes.length) {
          setHasMore(false)
          return previousResult
        }

        setPage(page + 1)

        const newData = {
          bikesFeed: {
            __typename: 'BikeFeed',
            bikes: [
              ...previousResult.bikesFeed.bikes,
              ...fetchMoreResult.bikesFeed.bikes,
            ],
          },
        }
        return newData
      },
    })
  }
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>

  const { bikesFeed } = data
  console.log(`LL: bikesFeed`, bikesFeed)
  const { bikes } = bikesFeed
  console.log(`LL: bikes`, bikes)

  return (
    <div className='container'>
      <div className='feed'>
        <InfiniteScroll
          dataLength={bikes.length}
          next={() => loadMore(fetchMore)}
          hasMore={hasMore}
          loader={
            <div className='loader' key={'loader'}>
              Loading ...
            </div>
          }
        >
          {bikes.map((bike: any) => (
            <div
              key={bike.id}
              className={'bike ' + (bike.id < 0 ? 'optimistic' : '')}
            >
              <div className='header'>
                <img src={bike.user.avatar} />
                <h2>{bike.user.username}</h2>
              </div>
              <p className='content'>{bike.text}</p>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Feed
