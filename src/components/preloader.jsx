import React from 'react'
import Lottie from 'lottie-react-web'

import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import loading from '../lottie/loading'

const Preloader = props => {
  return (
    <CSSTransition
      in={props.isLoading}
      timeout={2000}
      classNames="alert"
      unmountOnExit
    >
      <div className="preloader">
        <div className="preloader__wrap">
          <CSSTransition
            in={props.isLoading}
            timeout={2000}
            classNames="alert"
            unmountOnExit
          >
            <Lottie
              options={{
                animationData: loading,
                loop: true,
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
    isLoading: state.app.isLoading
  }
}

export default connect(mapStateToProps)(Preloader)
