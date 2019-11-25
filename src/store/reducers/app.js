import * as types from '../action-types'

const defaultState = {
  searchResults: [],
  isLoading: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SHOW_PRELOADER: {
      return { ...state, isLoading: true }
    }

    case types.HIDE_PRELOADER: {
      return { ...state, isLoading: false }
    }

    case types.ADD_SEARCH_RESULTS: {
      return { ...state, searchResults: action.results }
    }

    case types.CLEAR_SEARCH_RESULTS: {
      return { ...state, searchResults: [] }
    }

    default: {
      return state
    }
  }
}
