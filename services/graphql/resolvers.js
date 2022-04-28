import logger from '../../helpers/logger'
import to from 'await-to-js';
import axios from 'axios'

import isNotEmpty from '../../helpers/isNotEmpty';

const resolvers = {
	RootQuery: {
		async bikes(root, args, context) {
			const [ err, response ] = await to(axios.get("https://kovan-dummy-api.herokuapp.com/items"));
			if (err) return logger.log({ level: 'error', message: 'Bike list con not fetch' })
			return response.data?.data?.bikes
		},
		async bikeList(root, args, context) {
			const paramOptions = context.body.variables
			let params = '?';
      [
        'page',
				'vehicle_type',
				'bike_id'
      ].forEach(i => {
        if (i in paramOptions && isNotEmpty(paramOptions[i])) {
          params += `${i}=${paramOptions[i]}&`
        }
      })
      params = params.slice(0, -1)
			const [ err, response ] = await to(axios.get(`https://kovan-dummy-api.herokuapp.com/items${params}`));
			if (err) return logger.log({ level: 'error', message: 'Bike list cannot fetch' })
			return response.data
		},
	},
	RootMutation: {
		addBike(root, { bike }, context) {
			const bikeObject = {
				...bike,
				id: bikes.length + 1,
			}
			bikes.push(bikeObject)
			logger.log({ level: 'info', message: 'Bike was created' })
			return bikeObject
		},
	},
}

export default resolvers
