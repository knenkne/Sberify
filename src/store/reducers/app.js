import * as types from '../action-types'

const defaultState = {
  searchResults: [],
  isLoading: false,
  redirectUri: '',
  error: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SHOW_PRELOADER: {
      return { ...state, isLoading: true }
    }

    case types.HIDE_PRELOADER: {
      return { ...state, isLoading: false, redirectUri: action.payload }
    }

    case types.ADD_SEARCH_RESULTS: {
      return { ...state, searchResults: action.results }
    }

    case types.CLEAR_SEARCH_RESULTS: {
      return { ...state, searchResults: [] }
    }

    case types.REDIRECT: {
      return { ...state, redirectUri: action.payload }
    }

    case types.INIT_ERROR: {
      return { ...state, error: action.payload }
    }

    default: {
      return state
    }
  }
}
