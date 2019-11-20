import * as types from '../action-types'

const defaultState = {
  name: ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.PLAY_SONG: {
      return { ...state, ...action.name }
    }

    default: {
      return state
    }
  }
}
