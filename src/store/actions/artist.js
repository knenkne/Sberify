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

export const addArtist = payload => dispatch => {
  dispatch({
    type: types.SHOW_PRELOADER
  })

  axios
    .put(`/api/artist/${payload}`)
    .then(() => {
      dispatch({
        type: types.REDIRECT,
        payload
      })
    })
    .catch(err => {
      console.log(err.response.data)
    })
}

export const getArtists = payload => dispatch => {
  axios.get(`/api/artist/find/${payload}`).then(response => {
    dispatch({
      type: types.ADD_SEARCH_RESULTS,
      results: response.data
    })
  })
}

export const clearArtists = () => dispatch => {
  dispatch({
    type: types.CLEAR_SEARCH_RESULTS
  })
}
