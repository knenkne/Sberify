import React, { useState, useRef, useEffect, useCallback } from 'react'

import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from '../../store'

import Play from './play'

const getTimeLeft = (duration, time) => {
  const minutes = Math.floor((duration - time) / 60)
  const seconds = String(Math.floor((duration - time) % 60)).padStart(2, '0')

  return `${minutes}:${seconds}`
}

const Song = ({ artist, name, url, image, index, currentSong, play }) => {
  const timelineRef = useRef(null)
  const playerRef = useRef(new Audio(url))

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

    setPlay(!isPlaying)
  }, [isLoaded, isPlaying, name, play, updateInterval])

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
      {url && <Play onClick={toggle} isPlaying={isPlaying} />}
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

// class Song extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       isDragged: false,
//       duration: 30,
//       isPlaying: false,
//       isRewinding: false,
//       time: 0,
//       url: this.props.url,
//       interval: null,
//       timelane: {
//         x: 0,
//         width: 0
//       }
//     }

//     this.player = new Audio(this.state.url)
//     this.player.volume = 0.2

//     this.timeline = React.createRef()
//   }

//   componentDidMount() {
//     this.setState({
//       timelane: {
//         x: this.timeline.current.getBoundingClientRect().x,
//         width: this.timeline.current.offsetWidth
//       }
//     })
//   }

//   componentWillUnmount() {
//     this.stop()
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.currentSong !== this.props.name && this.state.isPlaying) {
//       // this.child.forceUpdate()
//       this.pause()
//     }
//   }

// play = () => {
//   this.setState(
//     {
//       isPlaying: !this.state.isPlaying,
//       interval: this.state.isPlaying
//         ? clearInterval(this.state.interval) || null
//         : setInterval(() => this.update(), 10)
//     },
//     () => {
//       if (this.state.isPlaying) {
//         this.props.play({
//           name: this.props.name
//         })
//         this.player.play()
//       } else {
//         this.player.pause()
//       }
//     }
//   )
// }

//   pause = () => {
//     this.setState(
//       {
//         isPlaying: false,
//         interval: clearInterval(this.state.interval) || null
//       },
//       () => {
//         this.player.pause()
//       }
//     )
//   }

//   stop = () => {
//     this.setState({
//       isPlaying: false,
//       interval: clearInterval(this.state.interval) || null,
//       time: 0
//     })

//     this.player.pause()
//     this.player.currentTime = 0
//   }

//   update = () => {
//     this.setState(
//       {
//         time: Number(Math.round(this.state.time + 0.01 + 'e2') + 'e-2')
//       },
//       () => {
//         if (this.state.time >= this.state.duration) {
//           this.child.forceUpdate()
//           this.stop()
//         }
//       }
//     )
//   }

//   onMouseDown = () => {
//     this.setState(
//       {
//         isDragged: true,
//         isRewinding: true
//       },
//       () => {
//         this.pause()
//       }
//     )
//   }

//   onMouseUp = evt => {
//     evt.preventDefault()

//     if (this.state.isDragged) {
//       this.setState(
//         {
//           isDragged: false,
//           isRewinding: false
//         },
//         () => {
//           this.play()
//         }
//       )
//     }
//   }

//   onMouseMove = evt => {
//     evt.preventDefault()

//     if (this.state.isDragged) {
//       switch (true) {
//         case (30 * (evt.screenX - this.state.timelane.x)) /
//           this.state.timelane.width <
//           0: {
//           this.setState(
//             {
//               time: 0
//             },
//             () => {
//               this.player.currentTime = this.state.time
//             }
//           )

//           break
//         }

//         case (30 * (evt.screenX - this.state.timelane.x)) /
//           this.state.timelane.width >
//           30: {
//           this.setState(
//             {
//               time: 30
//             },
//             () => {
//               this.player.currentTime = this.state.time
//             }
//           )

//           break
//         }

//         default: {
//           this.setState(
//             {
//               time:
//                 (30 * (evt.screenX - this.state.timelane.x)) /
//                 this.state.timelane.width
//             },
//             () => {
//               this.player.currentTime = this.state.time
//             }
//           )
//         }
//       }
//     }
//   }

//   render() {
//     console.log(this.props.name, 'rerender')
//     return (
//       <li
//         onMouseMove={this.onMouseMove}
//         onMouseUp={this.onMouseUp}
//         onMouseLeave={this.onMouseUp}
//         className={`song${
//           this.state.isPlaying || this.state.isRewinding ? ' song--playing' : ''
//         }`}
//       >
//         {this.props.url && <Play onClick={this.play} name={this.props.name} />}
//         <NavLink
//           to={`/song/${this.props.name}`}
//           style={{ textDecoration: 'none' }}
//         >
//           {this.props.index && (
//             <span className="song__index">{this.props.index}</span>
//           )}
//           <img src={this.props.image} alt={this.props.name} />
//         </NavLink>
//         <div className="song__info">
//           <h3>{this.props.name}</h3>
//           <div ref={this.timeline} className="song__progress-wrapper">
//             <progress
//               className="song__progress"
//               max={this.state.duration}
//               value={this.state.time}
//             ></progress>
//             <div
//               onMouseDown={this.onMouseDown}
//               className="song__control"
//               style={{
//                 left: `${(this.state.time / this.state.duration) * 98}%`
//               }}
//             ></div>
//             <span className="song__time">
//               {getTimeLeft(this.state.duration, this.state.time)}
//             </span>
//           </div>
//           <h4>{this.props.artist}</h4>
//         </div>
//       </li>
//     )
//   }
// }

const mapStateToProps = state => ({
  currentSong: state.currentSong.name
})

const mapDispatchToProps = {
  play: actions.playSong
}

export default connect(mapStateToProps, mapDispatchToProps)(Song)
