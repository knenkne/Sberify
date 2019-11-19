import React from 'react'

import { connect } from 'react-redux'
import { actions } from '../store'

import Song from '../components/song/'

class Songs extends React.Component {
  constructor() {
    super()

    this.state = {}
  }

  componentDidMount() {
    this.props.initSongs(this.props.songs)
  }

  // componentDidUpdate() {
  //   this.props.initSongs(this.props.songs)
  // }

  render() {
    return (
      <article className="songs">
        <h4>{this.props.title}</h4>
        <ul>
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
      </article>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    songs: ownProps.songs
  }
}

const mapDispatchToProps = {
  initSongs: actions.initSongs
}

export default connect(mapStateToProps, mapDispatchToProps)(Songs)
