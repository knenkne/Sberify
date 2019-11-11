import React from "react";
import Play from "./play";
import "../App.scss";

export default class Song extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            duration: 250,
            isPlaying: false
        }
    }

    onPlayClick = () => {
        this.setState({
            isPlaying: !this.state.isPlaying
        })
    }

    render() {
        return (
            <li className={`song${this.state.isPlaying ? ' song--playing' : ''}`}>
                <Play data={this.props.icon} onClick={this.onPlayClick}/>
                <img
                    src={this.props.image}
                    alt={this.props.name}
                />
                <div className="song__info">
                    <h3>{this.props.name}</h3>
                    <div className="song__progress">
                        <div className="song__control"></div>
                        <span className="song__time">{Math.floor(this.state.duration / 60)}:{`${Math.floor(this.state.duration % 60)}`.padStart(2, '0')}</span>
                    </div>
                    <h4>{this.props.artist}</h4>
                </div>
            </li>
        );
    }
}
