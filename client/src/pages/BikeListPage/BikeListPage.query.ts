import React from 'react'
import { gql } from '@apollo/client'

export const GET_BIKES = gql`
  query getBikeList($page: Int, $bike_id: String, $vehicle_type: String) {
    bikeList(page: $page, bike_id: $bike_id, vehicle_type: $vehicle_type) {
      last_updated
      ttl
      data {
        bikes {
          bike_id
          lat
          lon
          is_reserved
          is_disabled
          vehicle_type
        }
        bike {
          bike_id
          lat
          lon
          is_reserved
          is_disabled
          vehicle_type
        }
      }
      total_count
      nextPage
    }
  }
`
