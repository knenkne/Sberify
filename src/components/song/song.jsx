import React from "react";
import Play from "./play";
import Timeline from "./timeline";

export default class Song extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: 30,
      isPlaying: false,
      isPlayed: false,
      timeline: 0,
      interval: null
    };

    this.song = new Audio(this.props.url);
    this.song.volume = 0.05;
  }

  onPlayClick = () => {
    this.setState(
      {
        isPlaying: !this.state.isPlaying
      },
      () => {
        switch (true) {
          case this.state.isPlaying:
            const interval = setInterval(() => {
              this.setState({
                timeline: +(this.state.timeline + 0.01).toFixed(3)
              });

              if (this.state.timeline >= this.state.duration) {
                this.setState({
                  isPlayed: true,
                  isPlaying: false,
                  timeline: 0,
                  interval: clearInterval(this.state.interval) || null
                });

                this.song.pause();
                this.song.currentTime = 0;
              }
            }, 10);

            this.setState({ interval });
            this.song.play();
            break;

          default:
            this.setState({
              interval: clearInterval(this.state.interval) || null
            });

            this.song.pause();
        }
      }
    );
  };

  render() {
    return (
      <li className={`song${this.state.isPlaying ? " song--playing" : ""}`}>
        <Play data={this.props.icon} timeline={this.state.timeline} duration={this.state.duration} onClickHandler={this.onPlayClick} />
        <img src={this.props.image} alt={this.props.name} />
        <div className="song__info">
          <h3>{this.props.name}</h3>
          <Timeline timeline={this.state.timeline} duration={this.state.duration} />
          <h4>{this.props.artist}</h4>
        </div>
      </li>
    );
  }
}
