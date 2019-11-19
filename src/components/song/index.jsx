import React from 'react'

import { connect } from 'react-redux'
import { actions } from '../../store'
import { NavLink } from 'react-router-dom'
import { normalizeNameToLink } from '../../utils'

import Play from './play'
import Timeline from './timeline'
import Control from './control'

const getTimeLeft = (duration, time) => {
  const minutes = Math.floor((duration - time) / 60)
  const seconds = String(Math.floor((duration - time) % 60)).padStart(2, '0')

  return `${minutes}:${seconds}`
}

class Song extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isDragged: false,
      duration: 29,
      isPlaying: false,
      isRewinding: false,
      time: 0,
      url:
        'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/e0/0d/d8/e00dd862-f773-7472-2d55-c55a63d07b4b/mzaf_8729962715842447390.plus.aac.p.m4a',
      interval: null,
      timelane: {
        x: 0,
        width: 0
      }
    }

    this.player = new Audio(this.state.url)
    this.player.volume = 0.05

    this.timeline = React.createRef()
  }

  componentDidMount() {
    this.setState({
      timelane: {
        x: this.timeline.current.getBoundingClientRect().x,
        width: this.timeline.current.offsetWidth
      }
    })
  }

  componentDidUpdate() {
    if (this.props.isSwitched) {
      this.child.forceUpdate()
    }

    if (this.props.isSwitched) {
      this.child.forceUpdate()
    }
  }

  play = () => {
    this.setState(
      {
        isPlaying: !this.state.isPlaying,
        interval: this.state.isPlaying
          ? clearInterval(this.state.interval) || null
          : setInterval(() => this.update(), 10)
      },
      () => {
        if (this.state.isPlaying) {
          this.player.play()
        } else {
          this.player.pause()
        }
      }
    )
  }

  pause = () => {
    this.setState(
      {
        isPlaying: false,
        interval: clearInterval(this.state.interval) || null
      },
      () => {
        this.player.pause()
      }
    )
  }

  stop = () => {
    this.setState({
      isPlaying: false,
      interval: clearInterval(this.state.interval) || null,
      time: 0
    })

    this.player.pause()
    this.player.currentTime = 0
  }

  update = () => {
    this.setState(
      {
        time: Number(Math.round(this.state.time + 0.01 + 'e2') + 'e-2')
      },
      () => {
        if (this.state.time >= this.state.duration) {
          this.child.forceUpdate()
          this.stop()
        }
      }
    )
  }

  onMouseDown = () => {
    this.setState(
      {
        isDragged: true,
        isRewinding: true
      },
      () => {
        this.pause()
      }
    )
  }

  onMouseUp = evt => {
    evt.preventDefault()

    if (this.state.isDragged) {
      this.play()
    }

    // this.setState({
    //   isDragged: false,
    //   isRewinding: false
    // })
  }

  onMouseMove = evt => {
    evt.preventDefault()

    if (this.state.isDragged) {
      switch (true) {
        case (30 * (evt.screenX - this.state.timelane.x)) /
          this.state.timelane.width <
          0: {
          // this.props.rewindSong({
          //   name: this.props.name,
          //   time: 0
          // })

          break
        }

        case (30 * (evt.screenX - this.state.timelane.x)) /
          this.state.timelane.width >
          30: {
          // this.props.rewindSong({
          //   name: this.props.name,
          //   time: 30
          // })
          break
        }

        default: {
          // this.props.rewindSong({
          //   name: this.props.name,
          //   time:
          //     (30 * (evt.screenX - this.props.timelane.x)) /
          //     this.props.timelane.width
          // })
        }
      }
    }
  }

  render() {
    return (
      <li
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        onMouseLeave={this.onMouseUp}
        className={`song${
          this.state.isPlaying || this.state.isRewinding ? ' song--playing' : ''
        }`}
      >
        {this.props.url && (
          <Play
            onClick={this.play}
            onRef={ref => (this.child = ref)}
            name={this.props.name}
          />
        )}
        <NavLink
          to={`/song/${this.props.name}`}
          style={{ textDecoration: 'none' }}
        >
          {this.props.index && (
            <span className="song__index">{this.props.index}</span>
          )}
          <img src={this.props.image} alt={this.props.name} />
        </NavLink>
        <div className="song__info">
          <h3>{this.props.name}</h3>
          <div ref={this.timeline} className="song__progress-wrapper">
            <progress
              className="song__progress"
              max={this.state.duration}
              value={this.state.time}
            ></progress>
            <div
              onMouseDown={this.onMouseDown}
              className="song__control"
              style={{
                left: `${(this.state.time / this.state.duration) * 98}%`
              }}
            ></div>
            <span className="song__time">
              {getTimeLeft(this.state.duration, this.state.time)}
            </span>
          </div>
          {/* {this.props.url && (
            <Timeline
              controlHandler={this.onMouseDown}
              isDragged={this.state.isDragged}
              name={this.props.name}
            >
              <Control
                isDragged={this.state.isDragged}
                dragHandler={this.onMouseDown}
                duration={this.props.duration}
                time={this.props.time}
                name={this.props.name}
              />
            </Timeline>
          )} */}
          <h4>{this.props.artist}</h4>
        </div>
      </li>
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
  pauseSong: actions.pauseSong,
  stopSong: actions.stopSong,
  rewindSong: actions.rewindSong,
  updateSong: actions.updateSong
}

export default connect(mapStateToProps, mapDispatchToProps)(Song)
