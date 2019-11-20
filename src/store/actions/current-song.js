import * as types from '../action-types'

export const playSong = payload => (dispatch, getState) => {
  dispatch({
    type: types.PLAY_SONG,
    name: payload
  })
}
