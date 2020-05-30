import React from 'react'
import Lottie from 'lottie-react-web'
import styled from '@emotion/styled'

import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from '../store'
import { Redirect } from 'react-router-dom'
import * as _ from 'lodash'

import search from '../lottie/search'
import logo from '../images/logo.svg'

const Input = styled.input`
  position: relative;
  z-index: 2;

  display: block;
  box-sizing: border-box;
  width: 9rem;
  height: 1.05rem;
  padding: 0 1rem 0 0.25rem;

  font-size: 0.45rem;
  line-height: 1.1rem;
  font-family: inherit;
  color: #ffffff;

  background-color: #000000;
  border: 0.05rem solid #19bb4f;
  border-radius: 0.25rem;

  transition-duration: 0.3s;
  transition-property: box-shadow;

  &:focus {
    outline: none;
  }
`

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
    this.debouncedOnChange = _.debounce(this.debouncedOnChange, 500, {
      leading: true
    })
  }

  onClickClearFiled = () => {
    this.setState(
      {
        value: ''
      },
      () => {
        this.props.clearArtists()
      }
    )
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

  onBlur = () => {
    this.setState(
      {
        isFocused: false,
        segments: this.state.segments.reverse()
      },
      () => {
        this.lottie.current.anim.playSegments(this.state.segments, true)
      }
    )
  }

  debouncedOnChange = value => {
    this.props.getArtists(value)
  }

  onChange = evt => {
    this.setState(
      {
        value: evt.target.value
      },
      () => {
        if (!this.state.isAddMode) {
          this.debouncedOnChange(this.state.value)
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
    if (this.props.redirectUri) {
      return <Redirect to={`/artist/${this.props.redirectUri}`} />
    }

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
            <Input
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
            <p className="home__message home__message--error">
              {this.props.error}
            </p>
            <button
              type="button"
              className="home__search-button"
              onMouseDown={this.onClickClearFiled}
            >
              <Lottie
                ref={this.lottie}
                options={{
                  animationData: search,
                  loop: false,
                  autoplay: false
                }}
              />
            </button>
            <div className="dropdown-menu-wrapper">
              <ul className="dropdown-menu">
                {this.props.results.length > 0 &&
                  this.props.results.map(result => {
                    return (
                      <li
                        key={result.name}
                        className="dropdown-menu__item"
                        style={{
                          backgroundImage: `url(${result.headerImage}`
                        }}
                      >
                        <NavLink
                          onMouseDown={evt => {
                            evt.preventDefault()
                          }}
                          to={`/artist/${encodeURIComponent(result.name)}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <h2>{result.name}</h2>
                        </NavLink>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </form>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: state.app.error,
  results: state.app.searchResults,
  redirectUri: state.app.redirectUri
})

const mapDispatchToProps = {
  addArtist: actions.addArtist,
  getArtists: actions.getArtists,
  clearArtists: actions.clearArtists
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
