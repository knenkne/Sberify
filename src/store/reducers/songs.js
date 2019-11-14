import * as types from '../action-types'
import { stat } from 'fs';

const defaultState = {}
const defaultSongState = {
    isPlaying: false,
    duration: 10,
    time: 0,
    interval: null
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case types.INIT_SONGS: {
            const stateCopy = { ...state }
            action.songs.forEach(song => {
                stateCopy[song.name] = {
                    image: song.image,
                    songPlayerUrl: song.songPlayerUrl,
                    ...defaultSongState
                }
            });

            return stateCopy
        }

        case types.PLAY: {
            const stateCopy = { ...state };
            stateCopy[action.name].interval = action.interval
            stateCopy[action.name].isPlaying = true

            return stateCopy
        }

        case types.PAUSE: {
            const stateCopy = { ...state };
            stateCopy[action.name].interval = clearInterval(stateCopy[action.name].interval) || null
            stateCopy[action.name].isPlaying = false

            return stateCopy
        }

        case types.TIME_UPDATE: {
            const stateCopy = { ...state };
            stateCopy[action.name].time = +(stateCopy[action.name].time + 0.01).toFixed(2)

            return stateCopy
        }

        case types.STOP: {
            const stateCopy = { ...state };
            stateCopy[action.name].interval = clearInterval(stateCopy[action.name].interval) || null
            stateCopy[action.name].isPlaying = false
            stateCopy[action.name].time = 0

            return stateCopy
        }

        default: {
            return state
        }
    }
}
