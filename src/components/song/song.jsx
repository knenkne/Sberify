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
    this.props.changeDrag(true)
    this.props.rewindSong({
      name: this.props.name
    })

    this.song.pause()
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
  };

  render() {
    return (
      <li className={`song${(this.props.isPlaying || this.props.isRewinding) ? " song--playing" : ""}`}>
        {this.props.url && (
          <Play
            data={this.props.icon}
            time={this.props.time}
            duration={this.props.duration}
            onClickHandler={this.onPlayClick}
            isPlaying={this.props.isPlaying}
          />
        )}
        <img src={this.props.image} alt={this.props.name} />
        <div className="song__info">
          <h3>{this.props.name}</h3>
          {this.props.url && (
            <Timeline
              onClickHandler={this.onControlClick}
              time={this.props.time}
              duration={this.props.duration}
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
    name: ownProps.name,
    isPlaying: state.songs[ownProps.name].isPlaying,
    isRewinding: state.songs[ownProps.name].isRewinding,
    isDragged: state.artist.isDragged,
    time: state.songs[ownProps.name].time,
    duration: state.songs[ownProps.name].duration,
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

export default connect(mapStateToProps, mapDispatchToProps)(Song);
