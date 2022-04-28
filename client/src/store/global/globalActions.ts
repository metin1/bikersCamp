import { AppDispatch, RootState } from 'src/store'

import { globalSlice } from './globalSlice'

const actions = globalSlice.actions

export const globalSelector = (state: RootState) => state.global

export const setLoading =
  (isLoading: boolean, loadingPageName?: string) =>
  	(dispatch: AppDispatch): void => {
  		dispatch(actions.setLoading({ isLoading, loadingPageName }))
  	}

export const catchErrorMessage =
  (payload: {
    statusCode: number
    error: any
    requestEndpoint: string
    redirectToUrl?: string
  }) =>
  	(dispatch: AppDispatch): void => {
  		dispatch(actions.setGeneralErrorMessage(payload))
  	}

export const clearErrorMessage =
  () =>
  	(dispatch: AppDispatch): void => {
  		dispatch(actions.clearGeneralErrorMessage())
  	}

export const setSearch =
  (key: string) =>
  	(dispatch: AppDispatch): void => {
  		dispatch(actions.setSearch(key))
  	}
