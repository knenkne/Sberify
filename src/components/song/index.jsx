import React from 'react'

import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from '../../store'

import Play from './play'

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
      duration: 30,
      isPlaying: false,
      isRewinding: false,
      time: 0,
      url: this.props.url,
      interval: null,
      timelane: {
        x: 0,
        width: 0
      }
    }

    this.player = new Audio(this.state.url)
    this.player.volume = 0.2

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

  componentWillUnmount() {
    this.stop()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentSong !== this.props.name && this.state.isPlaying) {
      this.child.forceUpdate()
      this.pause()
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
          this.props.playSong({
            name: this.props.name
          })
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
      this.setState(
        {
          isDragged: false,
          isRewinding: false
        },
        () => {
          this.play()
        }
      )
    }
  }

  onMouseMove = evt => {
    evt.preventDefault()

    if (this.state.isDragged) {
      switch (true) {
        case (30 * (evt.screenX - this.state.timelane.x)) /
          this.state.timelane.width <
          0: {
          this.setState(
            {
              time: 0
            },
            () => {
              this.player.currentTime = this.state.time
            }
          )

          break
        }

        case (30 * (evt.screenX - this.state.timelane.x)) /
          this.state.timelane.width >
          30: {
          this.setState(
            {
              time: 30
            },
            () => {
              this.player.currentTime = this.state.time
            }
          )

          break
        }

        default: {
          this.setState(
            {
              time:
                (30 * (evt.screenX - this.state.timelane.x)) /
                this.state.timelane.width
            },
            () => {
              this.player.currentTime = this.state.time
            }
          )
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
          <h4>{this.props.artist}</h4>
        </div>
      </li>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  name: ownProps.name,
  currentSong: state.currentSong.name
})

const mapDispatchToProps = {
  playSong: actions.playSong
}

export default connect(mapStateToProps, mapDispatchToProps)(Song)
