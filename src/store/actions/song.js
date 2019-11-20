import * as types from '../action-types'
import axios from 'axios'

export const initSong = payload => (dispatch, getState) => {
  dispatch({
    type: types.SHOW_PRELOADER
  })

  axios
    .get(`/api/song/${payload}`)
    .then(response => {
      dispatch({
        type: types.INIT_SONG,
        data: response.data
      })
    })
    .then(() => {
      dispatch({
        type: types.HIDE_PRELOADER
      })
    })
}

export const updateLyrics = payload => (dispatch, getState) => {
  axios
    .put(`/api/song/${payload.name}`, {
      lyrics: payload.lyrics
    })
    .then(() => {
      dispatch({
        type: types.UPDATE_LYRICS,
        data: {
          lyrics: payload.lyrics
        }
      })
    })
}
