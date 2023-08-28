import csrfFetch from "./csrf"
export const RECEIVE_RESULTS = 'RESULTS/RECEIVE_RESULTS'

export const receiveResults = (results) => {
    return {
        type: RECEIVE_RESULTS,
        results
    }
}

export const getResults = (state) => {
    return state.searchResults ? Object.values(state.searchResults) : []
}

export const fetchResults = (query) => async (dispatch) => {
    const res = await csrfFetch(`/api/search?query=${query}`)
    if (res.ok) {
      const newResults = await res.json()
      dispatch(receiveResults(newResults))
    }
}

export default function searchResultsRecucer(state={}, action) {
    switch (action.type) {
        case RECEIVE_RESULTS:
            return { ...action.results }
        default:
            return state
    }
}
