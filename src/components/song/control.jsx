import React from "react";

import { connect } from "react-redux";
import { actions } from "../../store";

class Control extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coords: {
        x: 0,
        y: 0
      }
    };

    this.timelineCoords = {
      x: 944.4375,
      y: 174.5
    };
  }

  onMouseDown = (evt) => {
      evt.preventDefault();

      // this.props.rewindSong({
      //   name: this.props.name
      // })

      this.props.dragHandler()
  }

  render() {
    return (
      <div
        onMouseDown={this.onMouseDown}
        className="song__control"
        style={{
          left: `${(this.props.time / this.props.duration) * 98}%`
        }}
      ></div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isDragged: ownProps.isDragged,
    duration: ownProps.duration,
    time: ownProps.time
  };
};

const mapDispatchToProps = {
  playSong: actions.playSong,
  pauseSong: actions.pauseSong,
  stopSong: actions.stopSong,
  rewindSong: actions.rewindSong,
  updateTime: actions.updateTime,
  changeDrag: actions.changeDrag
};

export default connect(mapStateToProps, mapDispatchToProps)(Control);
