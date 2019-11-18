import React from 'react'

import { connect } from 'react-redux'
import { actions } from '../../store'
import { NavLink } from 'react-router-dom'
import { normalizeNameToLink } from '../../utils'

import Play from './play'
import Timeline from './timeline'
import Control from './control'

class Song extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isDragged: false
    }

    this.props.initSong({
      name: this.props.name,
      artist: this.props.artist,
      image: this.props.image,
      songPlayerUrl: this.props.url
    })
  }

  componentDidUpdate() {
    if (this.props.isSwitched) {
      this.child.forceUpdate()
    }
  }

  onMouseDown = () => {
    this.setState({
      isDragged: true
    })
  }

  onMouseUp = evt => {
    evt.preventDefault()

    if (this.state.isDragged) {
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

    this.setState({
      isDragged: false
    })
  }

  onMouseMove = evt => {
    evt.preventDefault()

    if (this.state.isDragged) {
      switch (true) {
        case (30 * (evt.screenX - this.props.timelane.x)) /
          this.props.timelane.width <
          0: {
          this.props.rewindSong({
            name: this.props.name,
            time: 0
          })

          break
        }

        case (30 * (evt.screenX - this.props.timelane.x)) /
          this.props.timelane.width >
          30: {
          this.props.rewindSong({
            name: this.props.name,
            time: 30
          })
          break
        }

        default: {
          this.props.rewindSong({
            name: this.props.name,
            time:
              (30 * (evt.screenX - this.props.timelane.x)) /
              this.props.timelane.width
          })
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
          this.props.isPlaying || this.props.isRewinding ? ' song--playing' : ''
        }${this.props.isSingle ? ' song--single' : ''}`}
      >
        {this.props.url && (
          <Play onRef={ref => (this.child = ref)} name={this.props.name} />
        )}
        <NavLink
          to={`/song/${normalizeNameToLink(
            this.props.artist || this.props.artist.name
          )}-${normalizeNameToLink(this.props.name)}`}
          style={{ textDecoration: 'none' }}
        >
          {this.props.index && (
            <span className="song__index">{this.props.index}</span>
          )}
          <img src={this.props.image} alt={this.props.name} />
        </NavLink>
        <div className="song__info">
          <h3>{this.props.name}</h3>
          {this.props.url && (
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
          )}
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
  updateSong: actions.updateSong,
  initSong: actions.initSong
}

export default connect(mapStateToProps, mapDispatchToProps)(Song)
