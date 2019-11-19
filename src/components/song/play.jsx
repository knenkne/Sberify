import React from 'react'
import Lottie from 'lottie-react-web'

import play from '../../lottie/play'

class Play extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      segments: [0, 8.75]
    }

    this.lottie = React.createRef()
  }

  componentDidMount() {
    this.props.onRef(this)
    this.lottie.current.anim.goToAndStop(7.99, true)
  }

  componentDidUpdate() {
    this.setState({
      segments: this.state.segments.reverse()
    })
  }

  shouldComponentUpdate() {
    return false
  }

  onIconClick = () => {
    this.setState(
      {
        segments: this.state.segments.reverse()
      },
      () => {
        this.props.onClick()
        this.lottie.current.anim.playSegments(this.state.segments, true)
      }
    )
  }

  render() {
    return (
      <button className="song__play" onClick={this.onIconClick}>
        <Lottie
          ref={this.lottie}
          options={{
            animationData: play,
            loop: false,
            autoplay: false
          }}
        />
      </button>
    )
  }
}

export default Play
