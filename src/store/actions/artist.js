import * as types from '../action-types'
import axios from 'axios'

export const initArtist = payload => dispatch => {
  dispatch({
    type: types.SHOW_PRELOADER
  })

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

export const addArtist = payload => (dispatch, getState) => {
  dispatch({
    type: types.SHOW_PRELOADER
  })

  axios
    .put(`/api/artist/${payload}`)
    .then(response => {
      // dispatch({
      //   type: types.INIT_ARTIST,
      //   data: response.data
      // })
      console.log(response)
      // Dispatch redirect
    })
    .then(() => {
      dispatch({
        type: types.HIDE_PRELOADER
      })
    })
}
