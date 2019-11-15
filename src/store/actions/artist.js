import * as types from '../action-types'
import axios from 'axios'

export const initArtist = payload => (dispatch, getState) => {
  console.log(getState())
  axios
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