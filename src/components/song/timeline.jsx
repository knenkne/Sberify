import React from "react";

import Control from "./control";

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragged: false,
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
      <div className="song__progress-wrapper">
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
