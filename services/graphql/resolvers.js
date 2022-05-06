import logger from '../../helpers/logger'
import to from 'await-to-js'
import axios from 'axios'
import JWT from 'jsonwebtoken'

require('dotenv').config()
const { JWT_SECRET } = process.env

import isNotEmpty from '../../helpers/isNotEmpty'

const resolvers = {
  RootQuery: {
    async bikes(root, args, context) {
      console.log(`LL: bikes -> args`, args)
      const [err, response] = await to(axios.get('https://kovan-dummy-api.herokuapp.com/items'))
      if (err) return logger.log({ level: 'error', message: 'Bike list con not fetch' })
      return response.data?.data?.bikes
    },
    async bikeList(root, args, context) {
      let params = '?'
      ;['page', 'vehicle_type', 'bike_id'].forEach((i) => {
        if (i in args && isNotEmpty(args[i])) {
          params += `${i}=${args[i]}&`
        }
      })
      params = params.slice(0, -1)
      const [err, response] = await to(
        axios.get(`https://kovan-dummy-api.herokuapp.com/items${params}`)
      )
      if (err) return logger.log({ level: 'error', message: 'Bike list cannot fetch' })

      let totalParams = ''
      ;['vehicle_type'].forEach((i) => {
        if (i in args && isNotEmpty(args[i])) {
          totalParams += `${i}=${args[i]}&`
        }
      })
      totalParams = totalParams.slice(0, -1)
      const [errorTotal, responseTotal] = await to(
        axios.get(`https://kovan-dummy-api.herokuapp.com/items?page=0&${totalParams}`)
      )
      const total_booked = responseTotal?.data?.data?.bikes?.filter((i) => i?.is_reserved).length

      if (errorTotal) return logger.log({ level: 'error', message: 'Total bike list cannot fetch' })
      return {...response?.data, total_booked }
    },
  },
  RootMutation: {
    login(root, { userName, password }, context) {
      if (userName === 'admin' && password === 'admin') {
        const token = JWT.sign(
          {
            userName,
            id: 123,
          },
          JWT_SECRET || 'xxx_TOP_SECRET_TOKEN_KEY_xxx',
          {
            expiresIn: '1d',
          }
        )

        return {
          token,
        }
      } else {
        return new Error('User not found')
      }
    },
  },
}

export default resolvers
