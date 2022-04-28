import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IGlobalState } from './global.types'

const initialState: IGlobalState = {
	isLoading: false,
	searchQuery: '',
}

export type GlobalState = Readonly<typeof initialState>

const setLoading = (
	state: IGlobalState,
	action: PayloadAction<{ isLoading: boolean; loadingPageName: string }>
) => {
	state.isLoading = action.payload.isLoading
}

const setSearch = (state: IGlobalState, action: PayloadAction<string>) => {
	state.searchQuery = action.payload
}

const setGeneralErrorMessage = (
	state: IGlobalState,
	action: PayloadAction<{
    statusCode: number
    error: any
    requestEndpoint: string
    redirectToUrl?: string
  }>
) => {
	state.errorStatusCode = action.payload.statusCode
	state.error = action.payload.error
}

const clearGeneralErrorMessage = (state: IGlobalState) => {
	state.errorStatusCode = 0
	state.error = null
}

export const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		setLoading,
		setSearch,
		setGeneralErrorMessage,
		clearGeneralErrorMessage,
	},
})
