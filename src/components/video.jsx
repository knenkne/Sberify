import React from 'react'
import '../App.scss'

const Video = props => {
  return (
    <section className="video">
      <h4>Music video</h4>
      <iframe
        title="Clip"
        width="560"
        height="315"
        src={`${props.link}?autoplay=1&mute=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </section>
  )
}

export default Video
