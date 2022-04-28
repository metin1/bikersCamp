import AuthenticationService from './authenticationService'
import BikesService from './bikeService'

class ServiceProvider {
  private authentication: AuthenticationService
  get Authentication(): AuthenticationService {
  	if (!this.authentication) {
  		this.authentication = new AuthenticationService()
  	}
  	return this.authentication
  }

  private bikes: BikesService
  get Bikes(): BikesService {
  	if (!this.bikes) {
  		this.bikes = new BikesService()
  	}
  	return this.bikes
  }
}

export default new ServiceProvider()
