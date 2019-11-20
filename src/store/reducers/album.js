import * as types from '../action-types'

const defaultState = {
  name: '',
  date: '',
  image: '',
  songs: [],
  artist: {
    name: '',
    headerImage: '',
    albums: []
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.INIT_ALBUM: {
      const stateCopy = { ...state, ...action.data }

      return stateCopy
    }

    default: {
      return state
    }
  }
}
