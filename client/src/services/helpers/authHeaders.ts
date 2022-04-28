import { AxiosRequestHeaders } from 'axios'

export const bearerAuthHeader = (): Partial<AxiosRequestHeaders> => {
	const token: string = window.localStorage.getItem('bearerToken')
	if (token) {
		return {
			Authorization: 'Bearer ' + token,
		}
	} else {
		return null
	}
}

export const authHeader = (): Partial<AxiosRequestHeaders> => {
	const accessToken: string = window.localStorage.getItem('accessToken')
	const secretKey: string = window.localStorage.getItem('secretKey')
	if (accessToken && secretKey) {
		return {
			'access-token': accessToken,
			'secret-key': secretKey,
		}
	} else {
		return null
	}
}
