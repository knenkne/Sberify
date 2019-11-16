import React from 'react'

import { connect } from 'react-redux'
import { actions } from '../store'
import { normalizeLinkToName } from '../utils'

import Social from '../components/social'
import Songs from '../components/songs'
// import Album from '../components/album'
import Video from '../components/video'
import NotFound from '../components/404'

import twitter from '../lottie/twitter'
import facebook from '../lottie/facebook'
import instagram from '../lottie/instagram'

import '../App.scss'

class Album extends React.Component {
  constructor(props) {
    super(props)

    this.props.initAlbum(this.props.match.params.name)
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
              <h3 className="album__artist">{this.props.artist.name}</h3>
              {this.props.songs.length > 0 && (
                <Songs
                  title={`${this.props.name} tracklist`}
                  songs={this.props.songs}
                  image={this.props.image}
                  isNumbered={true}
                />
              )}
            </div>
            <div className="album__block"></div>
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
