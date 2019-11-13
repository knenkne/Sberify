import React from "react";

import { connect } from "react-redux";
import { actions } from "../../store";

import Play from "./play";
import Timeline from "./timeline";

class Song extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      duration: 30,
      isPlaying: false,
      timeline: 0,
      interval: null
    };

    this.song = new Audio(this.props.url);
    this.song.volume = 0.05;
  }

  onControlClick = () => {
    this.setState({
      interval: clearInterval(this.state.interval) || null
    });

    this.song.pause();
  };

  onPlayClick = () => {
    switch (true) {
      case this.props.isPlaying:
        console.log("true");
        this.props.pauseSong({
          isPlaying: false,
          interval: this.props.interval
        });
        break;
      default:
        this.props.playSong({
          isPlaying: true,
          interval: setInterval(() => {
            // this.props.updateTime(this.props.time);
          })
        });
    }

    // this.setState(
    //   {
    //     isPlaying: !this.state.isPlaying
    //   },
    //   () => {
    //     switch (true) {
    //       case this.state.isPlaying:
    //         const interval = setInterval(() => {
    //           this.setState({
    //             timeline: +(this.state.timeline + 0.01).toFixed(3)
    //           });

    //           if (this.state.timeline >= this.state.duration) {
    //             this.setState({
    //               isPlaying: false,
    //               timeline: 0,
    //               interval: clearInterval(this.state.interval) || null
    //             });

    //             this.song.pause();
    //             this.song.currentTime = 0;
    //           }
    //         }, 10);

    //         this.setState({ interval });
    //         this.song.play();
    //         break;

    //       default:
    //         this.setState({
    //           interval: clearInterval(this.state.interval) || null
    //         });

    //         this.song.pause();
    //     }
    //   }
    // );
  };

  render() {
    return (
      <li className={`song${this.state.isPlaying ? " song--playing" : ""}`}>
        {this.props.url && (
          <Play
            data={this.props.icon}
            timeline={this.state.timeline}
            duration={this.state.duration}
            onClickHandler={this.onPlayClick}
          />
        )}
        <img src={this.props.image} alt={this.props.name} />
        <div className="song__info">
          <h3>{this.props.name}</h3>
          {this.props.url && (
            <Timeline
              onClickHandler={this.onControlClick}
              timeline={this.state.timeline}
              duration={this.state.duration}
            />
          )}
          <h4>{this.props.artist}</h4>
        </div>
      </li>
    );
  }
}

Song.defaultProps = {
  name: "",
  url: "",
  isPlaying: false,
  duration: 0,
  time: 0,
  interval: null
};

const mapStateToProps = state => {
  return {
    isPlaying: state.song.isPlaying
  };
};

const mapDispatchToProps = {
  playSong: actions.playSong,
  pauseSong: actions.pauseSong,
  updateTime: actions.updateTime
};

export default connect(mapStateToProps, mapDispatchToProps)(Song);
