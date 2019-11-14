import * as types from '../action-types'

export const initSongs = (payload) => (dispatch) => {
    dispatch({
        type: types.INIT_SONGS,
        songs: payload
    })
}

export const playSong = (payload) => (dispatch) => {
    dispatch({
        type: types.PLAY,
        name: payload.name,
        interval: payload.interval
    })
}

export const pauseSong = (payload) => (dispatch) => {
    dispatch({
        type: types.PAUSE,
        name: payload.name
    })
}

export const stopSong = (payload) => (dispatch) => {
    dispatch({
        type: types.STOP,
        name: payload.name
    })
}

export const updateTime = (payload) => (dispatch) => {
    dispatch({
        type: types.TIME_UPDATE,
        name: payload
    })
}

export const rewindSong = (payload) => (dispatch) => {
    dispatch({
        type: types.REWIND,
        name: payload.name
    })
}