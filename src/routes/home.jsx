import React from 'react'
import Lottie from 'lottie-react-web'

import search from '../lottie/search'

import '../App.scss'

export default class Home extends React.Component {
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
        console.log('blur')
        this.lottie.current.anim.playSegments(this.state.segments, false)
      }
    )
  }

  onChange = evt => {
    this.setState({
      value: evt.target.value
    })
  }

  onClickSwitchMode = () => {
    this.setState({
      isAddMode: true
    })
  }

  render() {
    return (
      <div className="container">
        <section className="home">
          <div
            className={`home__search${
              this.state.isFocused ? ' home__search--focused' : ''
            }${this.state.isAddMode ? ' home__search--add' : ''}`}
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
            <button className="home__search-button">
              <Lottie
                ref={this.lottie}
                options={{
                  animationData: search,
                  loop: false,
                  autoplay: false
                }}
              />
            </button>
          </div>
        </section>
      </div>
    )
  }
}
