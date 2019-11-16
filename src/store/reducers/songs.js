import * as types from '../action-types'

const defaultState = {}
const defaultSongState = {
  isPlaying: false,
  isRewinding: false,
  isSwitched: false,
  duration: 30,
  time: 0,
  interval: null,
  timelane: {
    x: 0,
    width: 0
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.INIT_SONG: {
      const stateCopy = {
        ...state
      }

      stateCopy[action.name] = {
        image: action.image,
        songPlayerUrl: action.songPlayerUrl,
        player: new Audio(action.songPlayerUrl),
        ...defaultSongState
      }

      stateCopy[action.name].player.volume = 0.05

      return stateCopy
    }

    case types.INIT_TIMELANE: {
      const stateCopy = {
        ...state
      }

      stateCopy[action.name].timelane = {
        x: action.x,
        width: action.width
      }

      return stateCopy
    }

    case types.PLAY: {
      const stateCopy = {
        ...state
      }

      // Other songs pause
      for (const song in stateCopy) {
        stateCopy[song].isSwitched = false

        if (stateCopy[song].isPlaying) {
          stateCopy[song].isSwitched = true
        }

        stateCopy[song].isPlaying = false

        stateCopy[song].interval =
          clearInterval(stateCopy[song].interval) || null
        stateCopy[song].player.pause()
      }

      stateCopy[action.name].interval = action.interval
      stateCopy[action.name].isPlaying = true
      stateCopy[action.name].isRewinding = false
      stateCopy[action.name].player.play()

      return stateCopy
    }

    case types.PAUSE: {
      const stateCopy = {
        ...state
      }

      stateCopy[action.name].interval =
        clearInterval(stateCopy[action.name].interval) || null
      stateCopy[action.name].isPlaying = false
      stateCopy[action.name].player.pause()

      return stateCopy
    }

    case types.TIME_UPDATE: {
      const stateCopy = {
        ...state
      }

      stateCopy[action.name].time = +(
        stateCopy[action.name].time + 0.01
      ).toFixed(2)

      return stateCopy
    }

    case types.STOP: {
      const stateCopy = {
        ...state
      }

      stateCopy[action.name].interval =
        clearInterval(stateCopy[action.name].interval) || null
      stateCopy[action.name].isPlaying = false
      stateCopy[action.name].time = 0
      stateCopy[action.name].player.pause()
      stateCopy[action.name].player.currentTime = 0

      return stateCopy
    }

    case types.REWIND: {
      const stateCopy = {
        ...state
      }

      stateCopy[action.name].interval =
        clearInterval(stateCopy[action.name].interval) || null
      stateCopy[action.name].isPlaying = false
      stateCopy[action.name].isRewinding = true
      stateCopy[action.name].player.pause()
      stateCopy[action.name].time = action.time
      stateCopy[action.name].player.currentTime = action.time

      return stateCopy
    }

    default: {
      return state
    }
  }
}
