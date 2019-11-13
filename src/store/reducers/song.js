import * as types from '../action-types'

const defaultState = {
    name: '',
    url: '',
    isPlaying: false,
    duration: 0,
    time: 0,
    interval: null
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case types.PLAY: {
            return {
                ...state,
                isPlaying: action.isPlaying
            }
        }
        case types.PAUSE: {
            return {
                ...state,
                isPlaying: action.isPlaying
            }
        }
        case types.TIME_UPDATE: {
            return {
                ...state,
                time: state.time + action.time
            }
        }
        default: {
            return state
        }
    }
}
