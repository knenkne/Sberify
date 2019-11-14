import * as types from '../action-types'

const defaultState = {
    isPlaying: false,
    interval: null,
    time: 0,
    duration: 30
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case types.PLAY: {
            const stateCopy = { ...state };
            stateCopy[action.name].isPlaying = true

            return {
                ...state
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
