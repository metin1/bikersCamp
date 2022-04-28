import { createSelector } from 'reselect'

import { IRootState } from 'src/store'

const globalSelector = (state: IRootState) => state.global

export const globalStateSelector = createSelector(
	globalSelector,
	state => state
)

export const globalLoadingSelector = createSelector(globalSelector, state =>
	Boolean(state.isLoading)
)

export const searchSelector = createSelector(
	globalSelector,
	state => state?.searchQuery
)
