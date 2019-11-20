import * as types from '../action-types'

const defaultState = {
  name: '',
  album: {
    name: '',
    date: '',
    songs: []
  },
  lyrics: '',
  artistImage: '',
  artist: '',
  url: ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.INIT_SONG: {
      return { ...state, ...action.data }
    }

    case types.UPDATE_LYRICS: {
      return { ...state, ...action.data }
    }

    default: {
      return state
    }
  }
}
