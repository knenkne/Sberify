import React from "react";
import Play from "./play";
import Lottie from "lottie-react-web";
import "../App.scss";

export default class Song extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            duration: 5,
            isPlaying: false,
            timeline: 0,
            interval: null,
            url: 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/f8/12/83/f812839e-12bf-2656-2885-1377892d40d4/mzaf_6180457969525247890.plus.aac.p.m4a'
        }

        this.song = new Audio(this.state.url)
        this.song.volume = 0.05;

        // this.lottie = React.createRef();
    }

    componentDidMount() {
        // this.lottie.current.anim.goToAndStop(7, true)
        // this.lottie.current.anim.setSpeed(0.1)
    }

    shouldComponentUpdate() {
        return true
    }

    onPlayClick = () => {
        this.setState({
            isPlaying: !this.state.isPlaying
        }, () => {
            switch (true) {
                case this.state.isPlaying:
                        const interval = setInterval(() => {
                            this.setState({
                                timeline: +(this.state.timeline + 0.01).toFixed(3)
                            })
            
                            // this.lottie.current.anim.goToAndStop(0, true)
            
                            if (this.state.timeline >= this.state.duration) {
                                this.setState({
                                    isPlaying: false,
                                    timeline: 0,
                                    interval: clearInterval(this.state.interval) || null
                                })
            
                                // this.lottie.current.anim.playSegments([0, 8], true)
                                this.song.pause()
                                this.song.currentTime = 0
                            }
                        }, 10)
            
                        this.setState({ interval })
                    this.song.play()
                    // this.lottie.current.anim.playSegments([8, 0], true)
                    break

                default:
                    this.setState({
                        interval: clearInterval(this.state.interval) || null
                    })

                    this.song.pause()
                    // this.lottie.current.anim.playSegments([0, 8], true)
            }

        })
    }

    onPlayAnimationCompelte = () => {
        if (this.state.isPlaying) {
            const interval = setInterval(() => {
                this.setState({
                    timeline: +(this.state.timeline + 0.01).toFixed(3)
                })

                // this.lottie.current.anim.goToAndStop(0, true)

                if (this.state.timeline >= this.state.duration) {
                    this.setState({
                        isPlaying: false,
                        timeline: 0,
                        interval: clearInterval(this.state.interval) || null
                    })

                    // this.lottie.current.anim.playSegments([0, 8], true)
                    this.song.pause()
                    this.song.currentTime = 0
                }
            }, 10)

            this.setState({ interval })
        }
    }

    render() {
        return (
            <li className={`song${this.state.isPlaying ? ' song--playing' : ''}`}>
                {/* <button className="song__play" onClick={this.onPlayClick}>
                    <Lottie eventListeners={[{ eventName: 'complete', callback: this.onPlayAnimationCompelte }]} ref={this.lottie} options={{ animationData: this.props.icon, loop: false, autoplay: false }} />
                </button> */}
                <Play data={this.props.icon} onClickHandler={this.onPlayClick}/>
                <img
                    src={this.props.image}
                    alt={this.props.name}
                />
                <div className="song__info">
                    <h3>{this.props.name}</h3>
                    <div className="song__progress-wrapper">
                        <progress className="song__progress" max={this.state.duration} value={this.state.timeline}></progress>
                        <div className="song__control" style={{ left: `${this.state.timeline / this.state.duration * 100}%` }}></div>
                        <span className="song__time">{Math.floor((this.state.duration - this.state.timeline) / 60)}:{`${Math.floor((this.state.duration - this.state.timeline) % 60)}`.padStart(2, '0')}</span>
                    </div>
                    <h4>{this.props.artist}</h4>
                </div>
            </li>
        );
    }
}
