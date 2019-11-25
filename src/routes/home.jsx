import React from 'react'
import Lottie from 'lottie-react-web'

import { connect } from 'react-redux'
import { actions } from '../store'

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
          console.log('searching')
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
            {/* <h1 className="home__title">Sberify</h1>
            <h2 className="home__subtitle">
              Music <span>App</span>
            </h2> */}
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
            <ul className="dropdown-menu">
              <li className="dropdown-menu__item">
                <h2>Architects</h2>
              </li>
              <li className="dropdown-menu__item">
                <h2>Architects</h2>
              </li>
            </ul>
          </form>
        </section>
      </div>
    )
  }
}

// const mapStateToProps = state => ({
//   ...state.album
// })

const mapDispatchToProps = {
  addArtist: actions.addArtist
}

export default connect(null, mapDispatchToProps)(Home)
