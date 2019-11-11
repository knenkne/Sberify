import React from "react";

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="song__progress-wrapper">
        <progress
          className="song__progress"
          max={this.props.duration}
          value={this.props.timeline}
        ></progress>
        <div
          className="song__control"
          style={{
            left: `${(this.props.timeline / this.props.duration) * 100}%`
          }}
        ></div>
        <span className="song__time">
          {Math.floor((this.props.duration - this.props.timeline) / 60)}:
          {`${Math.floor(
            (this.props.duration - this.props.timeline) % 60
          )}`.padStart(2, "0")}
        </span>
      </div>
    );
  }
}
