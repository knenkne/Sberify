import React from 'react'

import { connect } from 'react-redux'
import { actions } from '../../store'

const getTimeLeft = (duration, time) => {
  const minutes = Math.floor((duration - time) / 60)
  const seconds = String(Math.floor((duration - time) % 60)).padStart(2, '0')

  return `${minutes}:${seconds}`
}

class Timeline extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      minutes: Math.floor((this.props.duration - this.props.time) / 60),
      seconds: Math.floor((this.props.duration - this.props.time) % 60),
    }

    this.timeline = React.createRef()
  }

  componentDidMount() {
    this.props.init({
      name: this.props.name,
      x: this.timeline.current.getBoundingClientRect().x,
      width: this.timeline.current.offsetWidth,
    })
  }

  render() {
    return (
      <div ref={this.timeline} className="song__progress-wrapper">
        <progress
          className="song__progress"
          max={this.props.duration}
          value={this.props.time}
        ></progress>
        {this.props.children}
        <span className="song__time">
          {getTimeLeft(this.props.duration, this.props.time)}
        </span>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    name: ownProps.name,
    time: state.songs[ownProps.name].time,
    duration: state.songs[ownProps.name].duration,
    x: state.songs[ownProps.name].timelane.x,
    width: state.songs[ownProps.name].timelane.width,
  }
}

const mapDispatchToProps = {
  init: actions.initTimelane,
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
