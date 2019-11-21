import React from 'react'
import Lottie from 'lottie-react-web'

import { connect } from 'react-redux'
import { actions } from '../store'
import { Redirect } from 'react-router-dom'

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
    this.props.initSong(this.props.match.params.name)
  }

  componentDidUpdate(prevProps, prevState) {
    if (decodeURIComponent(this.props.match.params.name) !== this.props.name) {
      this.props.initSong(this.props.match.params.name)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      lyrics: nextProps.lyrics,
      isEdit: false
    })
  }

  onEditClick = evt => {
    evt.preventDefault()

    this.setState(
      {
        isEdit: !this.state.isEdit
      },
      () => {
        if (!this.state.isEdit) {
          this.props.updateLyrics({
            name: this.props.name,
            lyrics: this.state.lyrics
          })
        }
      }
    )
  }

  onLyricsChange = evt => {
    this.setState({
      lyrics: evt.target.value
    })
  }

  render() {
    if (!this.props.isFound) {
      return <Redirect to="/404/" />
    }

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
                    {this.state.lyrics.split('\n').map((row, index) => {
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
                    rows={10}
                    value={this.state.lyrics}
                    onChange={this.onLyricsChange}
                  ></textarea>
                )}
              </div>
            </div>
            <div className="song__block">
              <Nav album={this.props.album.name} artist={this.props.artist} />
              {this.props.name && (
                <Songs
                  artist={this.props.artist}
                  title={false}
                  songs={[
                    {
                      name: this.props.name,
                      songPlayerUrl: this.props.songPlayerUrl
                    }
                  ]}
                  image={this.props.album.image}
                />
              )}
              {this.props.album.songs.filter(
                song => song.name !== this.props.name
              ).length > 0 && (
                <Songs
                  artist={this.props.artist}
                  title={`More songs from ${this.props.album.name}`}
                  songs={this.props.album.songs.filter(
                    song => song.name !== this.props.name
                  )}
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
  initSong: actions.initSong,
  updateLyrics: actions.updateLyrics
}

export default connect(mapStateToProps, mapDispatchToProps)(Song)
