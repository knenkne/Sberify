import React from 'react'

import { connect } from 'react-redux'
import { actions } from '../store'
import { NavLink } from 'react-router-dom'

import Songs from '../components/songs'
import Albums from '../components/albums'
import Nav from '../components/nav'

import '../App.scss'

class Album extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.props.initAlbum(this.props.match.params.name)
  }

  componentDidUpdate(prevProps) {
    if (this.props.name !== decodeURIComponent(this.props.match.params.name)) {
      this.props.initAlbum(this.props.match.params.name)
    }
  }

  render() {
    return (
      <div className="container">
        <section className="album">
          <div
            className="album__header"
            style={{
              backgroundImage: `url(${this.props.artist.headerImage}`
            }}
          ></div>
          <div className="album__info">
            <div className="album__block">
              <img
                src={this.props.image}
                alt={this.props.name}
                className="album__image"
              />
              <span className="album__date">{this.props.date}</span>
              <h2 className="album__name">{this.props.name}</h2>
              <NavLink
                to={`/artist/${encodeURIComponent(this.props.artist.name)}`}
                style={{ textDecoration: 'none' }}
              >
                <h3 className="album__artist">{this.props.artist.name}</h3>
              </NavLink>
              {this.props.songs.length > 0 && (
                <Songs
                  artist={this.props.artist.name}
                  title={`${this.props.name} tracklist`}
                  songs={this.props.songs}
                  image={this.props.image}
                  isNumbered={true}
                />
              )}
            </div>
            <div className="album__block">
              <Nav
                album={encodeURIComponent(this.props.name)}
                artist={encodeURIComponent(this.props.artist.name)}
              />
              <Albums
                albums={this.props.artist.albums}
                title={`More albums by ${this.props.artist.name}`}
              />
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.album
})

const mapDispatchToProps = {
  initAlbum: actions.initAlbum
}

export default connect(mapStateToProps, mapDispatchToProps)(Album)
