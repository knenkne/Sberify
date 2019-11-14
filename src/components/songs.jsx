import React from "react";

import { connect } from "react-redux";
import { actions } from "../store";

import Song from './song/song'

class Songs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.props.initSongs(this.props.songs)
  }

  render() {
    return (
      <article className="artist__songs">
        <h4>Popular Songs</h4>
        <ul>
          {this.props.songs.map((song, index) => (
            <Song
              key={song.name}
              name={song.name}
              artist={this.props.artist}
              image={song.image}
              url={song.songPlayerUrl}
            />
          ))}
        </ul>
      </article>
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
