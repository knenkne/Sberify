import React from 'react'
import Lottie from 'lottie-react-web'

import { connect } from 'react-redux'
import { actions } from '../../store'

import play from '../../lottie/play'

class Play extends React.Component {
  constructor(props) {
    super(props)

    this.lottie = React.createRef()
  }
  componentDidMount() {
    this.props.onRef(this)
    this.lottie.current.anim.goToAndStop(7.99, true)
  }

  shouldComponentUpdate() {
    if (this.props.time < this.props.duration) {
      return false
    }

    return true
  }

  onIconClick = () => {
    switch (true) {
      case this.props.isPlaying: {
        this.props.pauseSong({
          name: this.props.name
        })

        break
      }

      default: {
        this.props.playSong({
          name: this.props.name,
          interval: setInterval(() => {
            this.props.updateSong(this.props.name)

            if (this.props.time >= this.props.duration) {
              this.props.stopSong({
                name: this.props.name
              })
            }
          }, 10)
        })
      }
    }

    this.lottie.current.anim.playSegments(
      this.props.isPlaying ? [0, 8.75] : [8.75, 0],
      true
    )
  }

  render() {
    return (
      <button className="song__play" onClick={this.onIconClick}>
        <Lottie
          ref={this.lottie}
          options={{
            animationData: play,
            loop: false,
            autoplay: false
          }}
        />
      </button>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  if (!state.songs[ownProps.name]) {
    return {
      name: ownProps.name
    }
  }

  return {
    name: ownProps.name,
    isPlaying: state.songs[ownProps.name].isPlaying,
    isRewinding: state.songs[ownProps.name].isRewinding,
    isSwitched: state.songs[ownProps.name].isSwitched,
    time: state.songs[ownProps.name].time,
    duration: state.songs[ownProps.name].duration,
    player: state.songs[ownProps.name].player,
    timelane: state.songs[ownProps.name].timelane
  }
}

const mapDispatchToProps = {
  playSong: actions.playSong,
  stopSong: actions.stopSong,
  pauseSong: actions.pauseSong,
  updateSong: actions.updateSong
}

export default connect(mapStateToProps, mapDispatchToProps)(Play)
