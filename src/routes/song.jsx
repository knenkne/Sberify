import React from 'react'

import { connect } from 'react-redux'
import { actions } from '../store'
import { NavLink } from 'react-router-dom'
import { normalizeNameToLink } from '../utils'

import SongElem from '../components/song'
import Songs from '../components/songs'
import Video from '../components/video'
import Nav from '../components/nav'

import '../App.scss'

class Song extends React.Component {
  constructor(props) {
    super(props)

    this.props.initSongPage(this.props.match.params.name)
  }

  componentDidUpdate(prevProps) {
    if (
      `${normalizeNameToLink(this.props.artist)}-${normalizeNameToLink(
        this.props.name
      )}`.toLowerCase() !== this.props.match.params.name.toLowerCase()
    ) {
      this.props.initSongPage(this.props.match.params.name)
    }
  }

  render() {
    return (
      <div className="container">
        <section className="song">
          <div
            className="song__header"
            style={{
              backgroundImage: `url(${this.props.headerImage}`
            }}
          ></div>
          <div className="song__info">
            <div className="song__block">
              <img
                src={this.props.image}
                alt={this.props.name}
                className="song__image"
              />
              <span className="song__date">{this.props.date}</span>
              <h2 className="song__name">{this.props.name}</h2>
              <h3 className="song__album">
                {this.props.album} by {this.props.artist}
              </h3>
              <div className="song__lyrics-wrapper">
                <div className="song__lyrics">
                  {this.props.lyrics.split('\n').map((row, index) => {
                    return (
                      <p
                        key={index}
                        style={{
                          fontWeight: row.startsWith('[') ? 800 : 400
                        }}
                      >
                        {row}
                        <br />
                      </p>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="song__block">
              <Nav
                album={normalizeNameToLink(this.props.album)}
                artist={normalizeNameToLink(this.props.artist)}
              />
              {this.props.name && (
                <Songs
                  artist={this.props.artist}
                  title={false}
                  songs={[
                    { name: this.props.name, songPlayerUrl: this.props.url }
                  ]}
                  image={this.props.image}
                />
              )}
              {this.props.songs.length > 0 && (
                <Songs
                  artist={this.props.artist}
                  title={`More songs from ${this.props.album}`}
                  songs={this.props.songs}
                  image={this.props.image}
                  isNumbered={true}
                />
              )}
              {this.props.video && (
                <Video link={this.props.video} title={`${this.props.name} `} />
              )}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.song
})

const mapDispatchToProps = {
  initSongPage: actions.initSongPage
}

export default connect(mapStateToProps, mapDispatchToProps)(Song)
