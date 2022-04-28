import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'

import { globalSlice, GlobalState } from 'src/store/global/globalSlice'

export const history = createBrowserHistory()

const middlewares = [routerMiddleware(history), thunk]
const store = configureStore({
	reducer: {
		router: connectRouter(history),
		global: globalSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(middlewares),
	devTools: process.env.NODE_ENV !== 'production',
})
export interface IRootState {
  readonly global: GlobalState
}

export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
export type AppDispatch = typeof store.dispatch

export default store
