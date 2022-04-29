const app = require('../../index')
const supertest = require('supertest')
const request = supertest(app)
const fetch = require('node-fetch')

describe('GraphQL', () => {
  it('should return all 10 bike', async () => {
    var myHeaders = new fetchHeaders()
    myHeaders.append('Content-Type', 'application/json')

    var graphql = JSON.stringify({
      query:
        'query getBikeList {\n    bikeList  { \n        last_updated,\n        ttl,\n        data {\n            bikes {\n\n                 bike_id, \n        lat,\n        lon,\n        is_reserved, \n        is_disabled, \n        vehicle_type\n            },\n             bike {\n\n                 bike_id, \n        lat,\n        lon,\n        is_reserved, \n        is_disabled, \n        vehicle_type\n            }\n        }\n        total_count,\n        nextPage\n    }\n}',
      variables: { page: 0 },
    })
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
      redirect: 'follow',
    }

    fetch('http://localhost:8000/graphql', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))

    request
      .post('/graphql')
      .send({ query: '{ bikeList({ bike_id } }' })
      .expect(200)
      .end((err, res) => {
        console.log(`LL: res?.body`, res?.body)
        expect(res?.body?.data?.bikeList?.bikes.length).toBe(10)
      })
  })
})
