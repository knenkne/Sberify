import * as types from '../action-types'

export const playSong = (payload) => (dispatch) => {
    dispatch({
        type: types.PLAY,
        isPlaying: payload.isPlaying,
        interval: payload.interval
    })
}

export const pauseSong = (payload) => (dispatch) => {
    dispatch({
        type: types.PAUSE,
        isPlaying: payload.isPlaying,
        interval: payload.interval
    })
}

export const updateTime = (payload) => (dispatch) => {
    dispatch({
        type: types.TIME_UPDATE,
        time: +(payload + 0.01).toFixed(3)
    })
}