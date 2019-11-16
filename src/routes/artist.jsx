import React from 'react'

import { connect } from 'react-redux'
import { actions } from '../store'
import { normalizeLinkToName } from '../utils'

import Social from '../components/social'
import Songs from '../components/songs'
import Album from '../components/album'
import Video from '../components/video'
import NotFound from '../components/404'

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

class Artist extends React.Component {
  constructor(props) {
    super(props)

    this.props.initArtist(this.props.match.params.name)
  }

  render() {
    return (
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
                {Object.entries(this.props.socials).map(([name, userName]) => {
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
                })}
              </ul>
              <div className="artist__description">
                {this.props.description.split('\n\n').map((item, index) => {
                  return <p key={index}>{item}</p>
                })}
              </div>
              {this.props.video && <Video link={this.props.video} />}
            </div>
            <div className="artist__block">
              {this.props.albums.length > 0 && (
                <Songs
                  songs={this.props.albums.slice(0, 3).map(album => ({
                    ...album.songs[0],
                    image: album.image
                  }))}
                  artist={this.props.name}
                />
              )}
              <article className="artist__albums">
                <h4>Latest Albums</h4>
                <ul>
                  {this.props.albums.map(album => (
                    <Album
                      key={album.name}
                      name={album.name}
                      date={album.date}
                      image={album.image}
                    />
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.artist
})

const mapDispatchToProps = {
  initArtist: actions.initArtist
}

export default connect(mapStateToProps, mapDispatchToProps)(Artist)
