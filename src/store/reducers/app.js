import * as types from '../action-types'

const defaultState = {
  isLoading: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SHOW_PRELOADER: {
      const stateCopy = { ...state }

      stateCopy.isLoading = true

      return stateCopy
    }

    case types.HIDE_PRELOADER: {
      const stateCopy = { ...state }

      stateCopy.isLoading = false

      return stateCopy
    }

    default: {
      return state
    }
  }
}
