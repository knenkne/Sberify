import React from "react";

import { connect } from "react-redux";
import { actions } from "../../store";

import Play from "./play";
import Timeline from "./timeline";

class Song extends React.Component {
  constructor(props) {
    super(props);
    
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
        this.props.pauseSong({
          name: this.props.name
        });

        this.song.pause()
        break;
      default:
        this.props.playSong({
          name: this.props.name,
          interval: setInterval(() => {
            // this.props.updateTime(this.name);
            this.props.updateTime(this.props.name)

            if (this.props.time >= this.props.duration) {
              this.props.stopSong({
                name: this.props.name
              })

              this.song.pause()
              this.song.currentTime = 0
            }
          }, 10)
        });

        this.song.play()
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
    // this.props.init()

    return (
      <li className={`song${this.props.songs[this.props.name].isPlaying ? " song--playing" : ""}`}>
        {this.props.url && (
          <Play
            data={this.props.icon}
            time={this.props.songs[this.props.name].time}
            duration={this.props.songs[this.props.name].duration}
            onClickHandler={this.onPlayClick}
            isPlaying={this.props.songs[this.props.name].isPlaying}
          />
        )}
        <img src={this.props.image} alt={this.props.name} />
        <div className="song__info">
          <h3>{this.props.name}</h3>
          {this.props.url && (
            <Timeline
              onClickHandler={this.onControlClick}
              time={this.props.songs[this.props.name].time}
              duration={this.props.songs[this.props.name].duration}
            />
          )}
          <h4>{this.props.artist}</h4>
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    songs: state.songs,
    name: ownProps.name,
    isPlaying: state.songs[ownProps.name].isPlaying,
    time: state.songs[ownProps.name].time,
    duration: state.songs[ownProps.name].duration,
  };
};

const mapDispatchToProps = {
  playSong: actions.playSong,
  pauseSong: actions.pauseSong,
  stopSong: actions.stopSong,
  updateTime: actions.updateTime
};

export default connect(mapStateToProps, mapDispatchToProps)(Song);
