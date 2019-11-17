import * as types from '../action-types'
import axios from 'axios'

export const initSongPage = payload => async (dispatch, getState) => {
  await dispatch({
    type: types.SHOW_PRELOADER
  })

  await axios
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
