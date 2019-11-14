import React from "react";

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

  // onMouseDown = (evt) => {
  //   evt.preventDefault();

  //   console.log("click");
  // this.setState({
  //   isDragged: false
  // });

  // this.props.onClickHandler();
  // };

  onMouseDown = evt => {
    evt.preventDefault();
    console.log("draggn");
    const control = evt.target;

    this.setState({
      coords: {
        x: control.offsetLeft,
        y: control.offsetTop
      },
      isDragged: false
    });

    this.props.onClickHandler();
  };

  onMouseUp = (evt) => {
    evt.preventDefault();
    const control = evt.target;

    this.setState({
      isDragged: false,
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
        x: this.state.isDragged ? evt.screenX - this.timelineCoords.x - control.offsetWidth / 2 : this.state.coords.x,
        y: this.state.isDragged ? control.offsetTop : this.state.coords.y
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
        <div
          className="song__control"
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onMouseLeave={this.onMouseUp}
          style={{
            left: (this.state.isDragged && `${this.state.coords.x}px`) || `${(this.props.time / this.props.duration) * 98}%`
          }}
        ></div>
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
