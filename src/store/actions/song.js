import * as types from '../action-types'
import axios from 'axios'

export const initSongPage = payload => (dispatch, getState) => {
  dispatch({
    type: types.SHOW_PRELOADER
  })

  axios
    .get(`/api/song/${payload}`)
    .then(response => {
      dispatch({
        type: types.INIT_SONG_PAGE,
        data: response.data
      })
    })
    .then(() => {
      dispatch({
        type: types.HIDE_PRELOADER
      })
    })
}
