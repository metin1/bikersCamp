import axios from 'axios'

import {
	IBikeDetail,
	ICredit,
	IReviewRequest,
} from 'src/shared/models/bike.model'

class BikesService {
	getPopularBikes() {
		return axios.get('/bike/popular?api_key=6716e688acf4f705126a35a2e51dacbc')
	}

	searchBikes(key: string) {
		return axios.get(
			`/search/bike?api_key=6716e688acf4f705126a35a2e51dacbc&query=${key}`
		)
	}

	getBikeDetail(id: string) {
		return axios.get<IBikeDetail>(
			`/bike/${id}?api_key=6716e688acf4f705126a35a2e51dacbc`
		)
	}

	getBikeCredits(id: number) {
		console.log('LL: BikesService -> getBikeCredits -> id', id)
		return axios.get<{ id: string; cast: ICredit[] }>(
			`/bike/${id.toString()}/credits?api_key=6716e688acf4f705126a35a2e51dacbc`
		)
	}

	getBikeReviews(id: number) {
		console.log('LL: BikesService -> getBikeReviews -> id', id)
		return axios.get<IReviewRequest>(
			`/bike/${id.toString()}/reviews?api_key=6716e688acf4f705126a35a2e51dacbc`
		)
	}
}

export default BikesService
