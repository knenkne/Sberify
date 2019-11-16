import React from 'react'
import Lottie from 'lottie-react-web'

import loading from '../lottie/loading'

import '../App.scss'

const NotFound = props => {
  return (
    <section className="not-found">
      <p>{props.message}</p>
      <ul>
        <li>
          <span>4</span>
        </li>
        <li>
          <Lottie
            options={{
              animationData: loading,
              loop: true,
              autoplay: true
            }}
          />
        </li>
        <li>
          <span>4</span>
        </li>
      </ul>
      <p>not found</p>
    </section>
  )
}

export default NotFound
