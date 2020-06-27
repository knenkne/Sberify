import React from 'react'

import Song from '../components/song/'

class Songs extends React.Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (
      <ul className="songs">
        {this.props.songs &&
          this.props.songs.map((song, index) => (
            <Song
              index={this.props.isNumbered && index + 1}
              key={song.name}
              name={song.name}
              artist={this.props.artist}
              image={song.image || this.props.image}
              url={song.songPlayerUrl}
            />
          ))}
      </ul>
    )
  }
}

export default Songs
