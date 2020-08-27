import React, { useState, useRef, useEffect, useCallback } from 'react'
import lottie from 'lottie-web'

import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from '../../store'

import animationData from '../../lottie/play'

import Play from './play'

const animationOptions = {
  container: null,
  loop: false,
  autoplay: false,
  animationData
}

const getTimeLeft = (duration, time) => {
  const minutes = Math.floor((duration - time) / 60)
  const seconds = String(Math.floor((duration - time) % 60)).padStart(2, '0')

  return `${minutes}:${seconds}`
}

const Song = ({ artist, name, url, image, index, currentSong, play }) => {
  const timelineRef = useRef(null)
  const buttonRef = useRef(null)
  const playerRef = useRef(new Audio(url))

  const [animation, setAnimation] = useState(null)
  const [updateInterval, setUpdateInterval] = useState(null)
  const [time, setTime] = useState(0)
  const [isLoaded, setLoaded] = useState(false)
  const [isPlaying, setPlay] = useState(false)
  const [isRewinding, toggleRewind] = useState(false)

  const stop = useCallback(() => {
    playerRef.current.pause()
    playerRef.current.currentTime = 0

    clearInterval(updateInterval)
    setUpdateInterval(null)
    setPlay(false)
  }, [updateInterval])

  useEffect(() => {
    if (name !== currentSong && isPlaying) {
      stop()
      if (animation) {
        animation.setDirection(-animation.playDirection)
        animation.play()
      }
    }
  }, [animation, currentSong, isPlaying, name, stop])

  useEffect(() => {
    setAnimation(
      lottie.loadAnimation({
        ...animationOptions,
        container: buttonRef.current
      })
    )
  }, [buttonRef])

  useEffect(() => {
    if (animation) {
      animation.goToAndStop(7, true)
    }
  }, [animation])

  const toggle = useCallback(() => {
    if (isPlaying) {
      playerRef.current.pause()

      clearInterval(updateInterval)
      setUpdateInterval(null)
    } else {
      // TODO: loader
      if (isLoaded) {
        play({
          name
        })
        playerRef.current.play()

        setUpdateInterval(
          setInterval(
            () => setTime(playerRef.current.currentTime.toFixed(1)),
            10
          )
        )
      }
    }

    animation.setDirection(-animation.playDirection)
    animation.play()
    setPlay(!isPlaying)
  }, [animation, isLoaded, isPlaying, name, play, updateInterval])

  useEffect(() => {
    if (playerRef) {
      playerRef.current.addEventListener('canplaythrough', () =>
        setLoaded(true)
      )

      playerRef.current.volume = 0.2
    }
  }, [playerRef])

  useEffect(() => {
    if (currentSong !== name) {
      stop()
    }
  }, [currentSong, name, stop])

  return (
    <li
      // onMouseMove={this.onMouseMove}
      // onMouseUp={this.onMouseUp}
      // onMouseLeave={this.onMouseUp}
      // TODO: cx
      className={`song${isPlaying || isRewinding ? ' song--playing' : ''}`}
    >
      {url && (
        <button className="song__play" onClick={toggle} ref={buttonRef} />
      )}
      <NavLink to={`/song/${name}`} style={{ textDecoration: 'none' }}>
        {index && <span className="song__index">{index}</span>}
        <img src={image} alt={name} />
      </NavLink>
      <div className="song__info">
        <h3>{name}</h3>
        <div ref={timelineRef} className="song__progress-wrapper">
          <progress
            className="song__progress"
            max={String(playerRef.current.duration)}
            value={time}
          ></progress>
          <div
            // onMouseDown={this.onMouseDown}
            className="song__control"
            style={{
              left: `${(time / playerRef.current.duration) * 98}%`
            }}
          ></div>
          <span className="song__time">
            {getTimeLeft(playerRef.current.duration, time)}
          </span>
        </div>
        <h4>{artist}</h4>
      </div>
    </li>
  )
}

const mapStateToProps = state => ({
  currentSong: state.currentSong.name
})

const mapDispatchToProps = {
  play: actions.playSong
}

export default connect(mapStateToProps, mapDispatchToProps)(Song)
