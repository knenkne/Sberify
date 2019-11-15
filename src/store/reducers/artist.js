import * as types from '../action-types'

const defaultState = {
  name: '',
  description: '',
  socials: {
    twitter: '',
    facebook: '',
    instagram: '',
  },
  albums: [],
  video: '',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.INIT_ARTIST: {
      const stateCopy = { ...state, ...action.data }

      stateCopy.headerImage = stateCopy.image_header

      delete stateCopy.image_header

      stateCopy.socials.twitter = action.data.twitter_name
      stateCopy.socials.facebook = action.data.facebook_name
      stateCopy.socials.instagram = action.data.instagram_name

      delete stateCopy.twitter_name
      delete stateCopy.facebook_name
      delete stateCopy.instagram_name

      return stateCopy
    }

    default: {
      return state
    }
  }
}
