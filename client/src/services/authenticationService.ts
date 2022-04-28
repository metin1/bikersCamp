import axios, { AxiosResponse } from 'axios'

export interface IRegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
}

class AccountService {
  private apiUrl: string

  constructor() {
  	this.apiUrl = 'api/auth'
  }

  getSession() {
  	return axios.get(`${this.apiUrl}`)
  }

  register(entity: IRegisterRequest): Promise<AxiosResponse<any>> {
  	return axios.post(`${this.apiUrl}/register`, entity)
  }

  login(username: string, password: string, rememberMe?: boolean) {
  	return axios.post('/login', {
  		username,
  		password,
  		rememberMe,
  	})
  }

  logout() {
  	return axios.post('/logout', {})
  }
}

export default AccountService
