import React from 'react'
import Lottie from 'lottie-react-web'

import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import loading from '../lottie/loading'

const Preloader = props => {
  return (
    <CSSTransition
      in={!props.isLoaded}
      timeout={1000}
      classNames="alert"
      unmountOnExit
    >
      <div className="preloader">
        <div className="preloader__wrap">
          <CSSTransition in={!props.isLoaded} classNames="alert" unmountOnExit>
            <Lottie
              options={{
                animationData: loading,
                loop: false,
                autoplay: true
              }}
            />
          </CSSTransition>
        </div>
      </div>
    </CSSTransition>
  )
}

const mapStateToProps = state => {
  return {
    isLoaded: state.app.isLoaded
  }
}

export default connect(mapStateToProps)(Preloader)
