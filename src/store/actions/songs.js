import * as types from '../action-types'

export const initSong = payload => dispatch => {
  dispatch({
    type: types.INIT_SONG,
    name: payload.name,
    artist: payload.artist,
    image: payload.image,
    songPlayerUrl: payload.songPlayerUrl
  })
}

export const initTimelane = payload => dispatch => {
  dispatch({
    type: types.INIT_TIMELANE,
    name: payload.name,
    x: payload.x,
    width: payload.width
  })
}

export const playSong = payload => dispatch => {
  dispatch({
    type: types.PLAY,
    name: payload.name,
    interval: payload.interval
  })
}

export const pauseSong = payload => dispatch => {
  dispatch({
    type: types.PAUSE,
    name: payload.name
  })
}

export const stopSong = payload => dispatch => {
  dispatch({
    type: types.STOP,
    name: payload.name
  })
}

export const updateSong = payload => dispatch => {
  dispatch({
    type: types.TIME_UPDATE,
    name: payload
  })
}

export const rewindSong = payload => dispatch => {
  dispatch({
    type: types.REWIND,
    name: payload.name,
    time: payload.time
  })
}
