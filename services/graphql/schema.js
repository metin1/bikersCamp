const typeDefinitions = `
  scalar Date

  type Bike {
    bike_id: String
    lat: Float
    lon: Float
    is_reserved: Boolean
    is_disabled: Boolean
    vehicle_type: String
    total_bookings: Int
    android: String
    ios: String
  }

  type BikeData {
    bikes: [Bike]
    bike: Bike
  }

  type BikeList {
    last_updated: Date,
    ttl: Int,
    data: BikeData,
    total_count: Int,
    nextPage: Boolean,
  }

  type RootQuery {
    bikes: [Bike],
    bikeList: BikeList
  }

  input BikeInput {
    bike_id: String!
  }

  input PageInput {
    page: Int!
  }

  type RootMutation {
    addBike (
      bike: BikeInput!
    ): Bike
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`

export default [typeDefinitions]
