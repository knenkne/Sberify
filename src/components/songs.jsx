import React from "react";

import { connect } from "react-redux";
import { actions } from "../store";

import Song from './song/song'
import play from '../lottie/play'

class Songs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    this.props.initSongs(this.props.songs)

    return (
        <ul>
        {this.props.songs.map((song, index) => (
          <Song
            icon={play}
            key={song.name}
            name={song.name}
            artist={this.props.artist}
            image={song.image}
            url={song.songPlayerUrl}
          />
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    songs: ownProps.songs
  }
}

const mapDispatchToProps = {
  initSongs: actions.initSongs,
};

export default connect(mapStateToProps, mapDispatchToProps)(Songs);
