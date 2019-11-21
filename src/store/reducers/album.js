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
  },
  isFound: true
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.INIT_ALBUM: {
      return {
        ...defaultState,
        ...action.data,
        isFound: action.data.name !== undefined
      }
    }

    default: {
      return state
    }
  }
}
