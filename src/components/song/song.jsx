import React from "react";

import { connect } from "react-redux";
import { actions } from "../../store";

import Play from "./play";
import Timeline from "./timeline";

class Song extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragged: false
    };

    this.timeline = React.createRef();
  }

  componentDidMount() {
    // console.log(this.timeline.current.clientHeight)
  }

  onMouseDown = () => {
    this.setState({
      isDragged: true
    });
  };

  onMouseUp = evt => {
    evt.preventDefault();

    if (this.state.isDragged) {
      this.props.playSong({
        name: this.props.name,
        interval: setInterval(() => {
          this.props.updateTime(this.props.name);

          if (this.props.time >= this.props.duration) {
            this.props.stopSong({
              name: this.props.name
            });
          }
        }, 10)
      });
    }

    this.setState({
      isDragged: false
    });
  };

  onMouseMove = evt => {
    evt.preventDefault();

    // 262 - bar width
    // 944 - bar left coords

    if (this.state.isDragged) {
      switch (true) {
        case (30 * (evt.screenX - this.props.timelane.x)) / this.props.timelane.width < 0: {
          this.props.rewindSong({
            name: this.props.name,
            time: 0
          });

          break;
        }

        case (30 * (evt.screenX - this.props.timelane.x)) / this.props.timelane.width > 30: {
          this.props.rewindSong({
            name: this.props.name,
            time: 30
          });
          break;
        }

        default: {
          this.props.rewindSong({
            name: this.props.name,
            time: (30 * (evt.screenX - this.props.timelane.x)) / this.props.timelane.width
          });
        }
      }
    }
  };

  onPlayClick = () => {
    switch (true) {
      case this.props.isPlaying: {
        this.props.pauseSong({
          name: this.props.name
        });

        break;
      }

      default: {
        this.props.playSong({
          name: this.props.name,
          interval: setInterval(() => {
            this.props.updateTime(this.props.name);

            if (this.props.time >= this.props.duration) {
              this.props.stopSong({
                name: this.props.name
              });
            }
          }, 10)
        });
      }
    }
  };

  render() {
    return (
      <li
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        onMouseLeave={this.onMouseUp}
        className={`song${
          this.props.isPlaying || this.props.isRewinding ? " song--playing" : ""
          }`}
      >
        {this.props.url && (
          <Play
            data={this.props.icon}
            time={this.props.time}
            duration={this.props.duration}
            onClickHandler={this.onPlayClick}
            isPlaying={this.props.isPlaying}
            isRewinding={this.props.isRewinding}
          />
        )}
        <img src={this.props.image} alt={this.props.name} />
        <div className="song__info">
          <h3>{this.props.name}</h3>
          {this.props.url && (
            <Timeline
              ref={this.timeline}
              controlHandler={this.onMouseDown}
              isDragged={this.state.isDragged}
              onClickHandler={this.onControlClick}
              onMouseMove={this.onMouseMove}
              time={this.props.time}
              duration={this.props.duration}
              name={this.props.name}
            />
          )}
          <h4>{this.props.artist}</h4>
        </div>
      </li>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    name: ownProps.name,
    isPlaying: state.songs[ownProps.name].isPlaying,
    isRewinding: state.songs[ownProps.name].isRewinding,
    isDragged: state.artist.cursor.isDragged,
    time: state.songs[ownProps.name].time,
    duration: state.songs[ownProps.name].duration,
    player: state.songs[ownProps.name].player,
    timelane: state.songs[ownProps.name].timelane
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
