import React from 'react'
import Lottie from 'lottie-react-web'

import { connect } from 'react-redux'
import { actions } from '../store'
import { NavLink } from 'react-router-dom'
import { normalizeNameToLink } from '../utils'

import edit from '..//lottie/edit'
import Songs from '../components/songs'
import Video from '../components/video'
import Nav from '../components/nav'

import '../App.scss'

class Song extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEdit: false,
      lyrics: ''
    }
  }

  componentDidMount() {
    this.props.initSongPage(this.props.match.params.name)
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.name !== this.props.name) {
      this.props.initSongPage(this.props.match.params.name)
    }
  }

  onEditClick = evt => {
    evt.preventDefault()

    this.setState({
      isEdit: !this.state.isEdit
    })
  }

  onLyricsChange = evt => {
    this.setState({
      lyrics: evt.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <section className="song">
          <div
            className="song__header"
            style={{
              backgroundImage: `url(${this.props.artistImage}`
            }}
          ></div>
          <div className="song__info">
            <div className="song__block">
              <img
                src={this.props.album.image}
                alt={this.props.name}
                className="song__image"
              />
              <span className="song__date">{this.props.album.date}</span>
              <h2 className="song__name">{this.props.name}</h2>
              <h3 className="song__album">
                {this.props.album.name} by {this.props.artist}
              </h3>
              <div className="song__lyrics-wrapper">
                <button
                  className="song__lyrics-toggle"
                  onClick={this.onEditClick}
                >
                  <Lottie
                    ref={this.lottie}
                    options={{
                      animationData: edit,
                      loop: true,
                      autoplay: true
                    }}
                  />
                </button>
                {!this.state.isEdit && (
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
                )}
                {this.state.isEdit && (
                  <textarea
                    value={this.props.lyrics}
                    onChange={this.changeLyrics}
                  ></textarea>
                )}
              </div>
            </div>
            <div className="song__block">
              <Nav
                album={normalizeNameToLink(this.props.album.name)}
                artist={normalizeNameToLink(this.props.artist)}
              />
              {/* {this.props.name && (
                <Songs
                  artist={this.props.artist}
                  title={false}
                  songs={[
                    { name: this.props.name, songPlayerUrl: this.props.url }
                  ]}
                  image={this.props.image}
                />
              )} */}
              {this.props.album.songs.length > 0 && (
                <Songs
                  artist={this.props.artist}
                  title={`More songs from ${this.props.album.name}`}
                  songs={this.props.album.songs}
                  image={this.props.album.image}
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
  initSongPage: actions.initSongPage,
  changeLyrics: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(Song)
