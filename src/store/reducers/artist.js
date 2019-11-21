import * as types from '../action-types'

const defaultState = {
  name: '',
  description: '',
  socials: {
    twitter: '',
    facebook: '',
    instagram: ''
  },
  albums: [],
  video: '',
  headerImage: '',
  isFound: true
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.INIT_ARTIST: {
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
