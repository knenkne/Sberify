import * as types from '../action-types'

const defaultState = {
  isLoaded: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.HIDE_PRELOADER: {
      const stateCopy = { ...state }

      stateCopy.isLoaded = true

      return stateCopy
    }

    default: {
      return state
    }
  }
}
