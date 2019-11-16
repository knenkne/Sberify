import * as types from '../action-types'
import axios from 'axios'

export const initArtist = payload => async (dispatch, getState) => {
  await dispatch({
    type: types.SHOW_PRELOADER
  })

  await axios
    .get(`/api/artist/${payload}`)
    .then(response => {
      dispatch({
        type: types.INIT_ARTIST,
        data: response.data
      })
    })
    .then(() => {
      dispatch({
        type: types.HIDE_PRELOADER
      })
    })
}
