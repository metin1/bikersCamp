const typeDefinitions = `
  scalar Date
  directive @auth on QUERY | FIELD_DEFINITION | FIELD

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

  type User {
    id: Int
    username: String
  }

  type Auth {
    token: String
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
    total_booked: Int,
    nextPage: Boolean,
  }

  type RootQuery {
    currentUser: User @auth
    bikes: [Bike],
    bikeList(page:Int, bike_id:String, vehicle_type:String): BikeList
  }

  input BikeInput {
    bike_id: String!
  }

  input PageInput {
    page: Int!
  }

  type RootMutation {
    login (
      userName: String!
      password: String!
    ): Auth
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`

export default [typeDefinitions]
