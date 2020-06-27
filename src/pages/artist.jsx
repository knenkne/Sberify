import React from 'react'

import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { actions } from '../store'
import { Redirect } from 'react-router-dom'

import Block from '../components/block'
import Social from '../components/social'
import Songs from '../components/songs'
import Albums from '../components/album/list'
import Video from '../components/video'

import twitter from '../lottie/twitter'
import facebook from '../lottie/facebook'
import instagram from '../lottie/instagram'

import '../App.scss'

const socialsMap = {
  twitter: {
    isLooped: true,
    data: twitter
  },
  facebook: {
    isLooped: true,
    data: facebook
  },
  instagram: {
    isLooped: false,
    data: instagram
  }
}

export class Artist extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    console.log(window.navigator.userAgent)
  }

  componentDidMount() {
    this.props.clearArtists()
    this.props.initArtist(this.props.match.params.name)
  }

  render() {
    if (this.props.isFound === false) {
      return <Redirect to="/404/" />
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>{this.props.name}</title>
          <meta property="og:site_name" content="Sberify Music App" />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:type" content="profile" />
          <meta property="og:title" content={this.props.name} />
          <meta property="og:description" content={this.props.description} />
          <meta property="og:image" content={this.props.image} />
        </Helmet>
        <div className="container">
          <section className="artist">
            <div
              className="artist__header"
              style={{
                backgroundImage: `url(${this.props.headerImage}`
              }}
            ></div>
            <div className="artist__info">
              <div className="artist__block">
                <img
                  src={this.props.image}
                  alt={this.props.name}
                  className="artist__image"
                />
                <h2 className="artist__name">{this.props.name}</h2>
                <ul className="artist__socials">
                  {Object.entries(this.props.socials).map(
                    ([name, userName]) => {
                      if (!userName) {
                        return ''
                      }

                      return (
                        <Social
                          key={name}
                          data={socialsMap[name].data}
                          isLooped={socialsMap[name].isLooped}
                          link={`https://${name}.com/${userName}`}
                        />
                      )
                    }
                  )}
                </ul>
                <div className="artist__description-wrapper">
                  <div className="artist__description">
                    {this.props.description.split('\n').map((item, index) => {
                      return <p key={index}>{item}</p>
                    })}
                  </div>
                </div>
                {this.props.video && (
                  <Block title="Music Video">
                    <iframe
                      className="video"
                      title="Clip"
                      width="560"
                      height="315"
                      src={`${this.props.video}?autoplay=1&mute=1`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </Block>
                )}
              </div>
              <div className="artist__block">
                {this.props.albums.length > 0 && (
                  <Block title="Popular songs">
                    <Songs
                      songs={this.props.albums.slice(0, 3).map(album => ({
                        ...album.songs[0],
                        image: album.image
                      }))}
                      artist={this.props.name}
                    />
                  </Block>
                )}
                <Albums albums={this.props.albums} />
              </div>
            </div>
          </section>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  ...state.artist
})

const mapDispatchToProps = {
  clearArtists: actions.clearArtists,
  initArtist: actions.initArtist
}

export default connect(mapStateToProps, mapDispatchToProps)(Artist)
