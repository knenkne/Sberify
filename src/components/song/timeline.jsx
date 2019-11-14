import React from "react";

import { connect } from "react-redux";
import { actions } from "../../store";

import Control from "./control";

class Timeline extends React.Component {
  constructor(props) {
    super(props);

    this.timeline = React.createRef()
  }

  componentDidMount() {
    this.props.init({
      name: this.props.name,
      x: this.timeline.current.getBoundingClientRect().x,
      width: this.timeline.current.offsetWidth,
    })
  }

  onMouseDown = evt => {
    evt.preventDefault();

    const control = evt.target;

    this.setState({
      coords: {
        x: control.offsetLeft,
        y: control.offsetTop
      }
    });

    this.props.onClickHandler();
  };

  onMouseUp = (evt) => {
    evt.preventDefault();
    const control = evt.target;

    this.setState({
      coords: {
        x: this.state.isDragged ? evt.screenX - this.timelineCoords.x - control.offsetWidth / 2 : this.state.coords.x,
        y: this.state.isDragged ? control.offsetTop : this.state.coords.y
      }
    });
  };

  onMouseMove = (evt) => {
    evt.preventDefault();
    const control = evt.target;
    this.setState({
      coords: {
        x: this.props.isDragged ? evt.screenX - this.timelineCoords.x - control.offsetWidth / 2 : this.state.coords.x
      }
    });
  };

  render() {
    return (
      <div ref={this.timeline} className="song__progress-wrapper">
        <progress
          className="song__progress"
          max={this.props.duration}
          value={this.props.time}
        ></progress>
        <Control isDragged={this.props.isDragged} dragHandler={this.props.controlHandler} duration={this.props.duration} time={this.props.time} name={this.props.name} />
        <span className="song__time">
          {Math.floor((this.props.duration - this.props.time) / 60)}:
          {`${Math.floor(
            (this.props.duration - this.props.time) % 60
          )}`.padStart(2, "0")}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    name: ownProps.name,
    // isPlaying: state.songs[ownProps.name].isPlaying,
    // isRewinding: state.songs[ownProps.name].isRewinding,
    // isDragged: state.artist.cursor.isDragged,
    // time: state.songs[ownProps.name].time,
    // duration: state.songs[ownProps.name].duration,
    // player: state.songs[ownProps.name].player
    x: state.songs[ownProps.name].timelane.x,
    width: state.songs[ownProps.name].timelane.width,
  };
};

const mapDispatchToProps = {
  init: actions.initTimelane,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
