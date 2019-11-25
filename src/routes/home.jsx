import React from 'react'
import Lottie from 'lottie-react-web'

import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from '../store'
import { CSSTransition } from 'react-transition-group'

import search from '../lottie/search'
import logo from '../images/logo.svg'

class Home extends React.Component {
  constructor() {
    super()

    this.state = {
      isAddMode: false,
      isFocused: false,
      segments: [30, 0],
      value: ''
    }

    this.lottie = React.createRef()
  }

  onFocus = () => {
    this.setState(
      {
        isFocused: true,
        segments: this.state.segments.reverse()
      },
      () => {
        this.lottie.current.anim.playSegments(this.state.segments, true)
      }
    )
  }

  onBlur = evt => {
    evt.preventDefault()
    this.setState(
      {
        isFocused: false,
        value: '',
        segments: this.state.segments.reverse()
      },
      () => {
        // this.props.clearArtists()
        this.lottie.current.anim.playSegments(this.state.segments, true)
      }
    )
  }

  onChange = evt => {
    this.setState(
      {
        value: evt.target.value
      },
      () => {
        if (!this.state.isAddMode) {
          this.props.getArtists(this.state.value)
        }
      }
    )
  }

  onClickSwitchMode = () => {
    this.setState({
      isAddMode: true
    })
  }

  onSubmit = evt => {
    evt.preventDefault()

    if (this.state.isAddMode) {
      this.props.addArtist(this.state.value)
    }
  }

  render() {
    return (
      <div className="container">
        <section className="home">
          <div className="home__header">
            <div className="home__logo-wrap">
              <img src={logo} alt="Sberify Music App" className="home__logo" />
            </div>
          </div>
          <form
            className={`home__search${
              this.state.isFocused ? ' home__search--focused' : ''
            }${this.state.isAddMode ? ' home__search--add' : ''}`}
            onSubmit={this.onSubmit}
          >
            <input
              type="text"
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChange={this.onChange}
              value={this.state.value}
            />
            <p className="home__message home__message--add">
              Type the name of the artist <span>(GeniusAPI)</span>
            </p>
            <p
              className="home__message home__message--find"
              onMouseDown={this.onClickSwitchMode}
            >
              Can't find? Add your own
            </p>
            <button type="button" className="home__search-button">
              <Lottie
                ref={this.lottie}
                options={{
                  animationData: search,
                  loop: false,
                  autoplay: false
                }}
              />
            </button>

            {this.props.results.length > 0 && (
              <ul className="dropdown-menu">
                {this.props.results.map(result => {
                  return (
                    <li
                      className="dropdown-menu__item"
                      style={{
                        backgroundImage: `url(${result.headerImage}`
                      }}
                    >
                      <NavLink
                        onClick={this.props.clearArtists}
                        to={`/artist/${encodeURIComponent(result.name)}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <h2>{result.name}</h2>
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            )}
          </form>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  results: state.app.searchResults
})

const mapDispatchToProps = {
  addArtist: actions.addArtist,
  getArtists: actions.getArtists,
  clearArtists: actions.clearArtists
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
