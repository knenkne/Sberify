import * as types from '../action-types'
import axios from 'axios'

export const initAlbum = payload => async (dispatch, getState) => {
  await dispatch({
    type: types.SHOW_PRELOADER
  })

  await axios
    .get(`/api/album/${payload}`)
    .then(response => {
      dispatch({
        type: types.INIT_ALBUM,
        name: payload,
        data: response.data
      })
    })
    .then(() => {
      dispatch({
        type: types.HIDE_PRELOADER
      })
    })
}
